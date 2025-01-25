import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
//end point nessesaire pour la creation d'un utilisateur
//qui fonctione en paralele avec sing_up_form/SignUpForm.tsx
export async function POST(req: Request) {
  try {
    // Parsear los datos enviados desde el formulario
    const { name, username, email, password } = await req.json();

    // Validar que todos los campos estén presentes
    if (!name || !username || !email || !password) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    // Validación adicional para la contraseña
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return NextResponse.json(
        {
          error:
            'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.',
        },
        { status: 400 }
      );
    }

    // Verificar si el email o username ya existen en la base de datos
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'Email or username already exists.' }, { status: 400 });
    }

    // Hashear la contraseña con bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario en la base de datos
    const newUser = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
        role: 'USER', // Asignar el rol por defecto
      },
    });

    // Responder con un mensaje de éxito y datos limitados del usuario
    return NextResponse.json({
      message: 'User registered successfully.',
      user: {
        id: newUser.id,
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        createdAt: newUser.createdAt,
      },
    });
  } catch (error: unknown) {
    console.error('Error creating user:', error);

    // Manejo específico de errores de Prisma (por ejemplo, violación de unicidad)
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as { code: string }).code === 'P2002'
    ) {
      return NextResponse.json(
        { error: 'Email or username already exists.' },
        { status: 400 }
      );
    }

    // Retornar un mensaje genérico para otros errores
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}

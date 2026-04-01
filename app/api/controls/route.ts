import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET all controls for a framework
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const frameworkName = searchParams.get('framework');

    if (!frameworkName) {
      return NextResponse.json({ error: 'Framework parameter required' }, { status: 400 });
    }

    const framework = await prisma.framework.findUnique({
      where: { name: frameworkName },
      include: {
        controls: {
          include: {
            comments: true,
            evidence: true,
            policies: true,
          },
          orderBy: { controlId: 'asc' },
        },
      },
    });

    if (!framework) {
      return NextResponse.json({ error: 'Framework not found' }, { status: 404 });
    }

    return NextResponse.json(framework.controls);
  } catch (error) {
    console.error('Error fetching controls:', error);
    return NextResponse.json({ error: 'Failed to fetch controls' }, { status: 500 });
  }
}

// POST create or update control
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { frameworkName, controlId, status, completed, comment } = body;

    const framework = await prisma.framework.findUnique({
      where: { name: frameworkName },
    });

    if (!framework) {
      return NextResponse.json({ error: 'Framework not found' }, { status: 404 });
    }

    // Find existing control
    const existingControl = await prisma.control.findUnique({
      where: {
        frameworkId_controlId: {
          frameworkId: framework.id,
          controlId: controlId,
        },
      },
    });

    if (!existingControl) {
      return NextResponse.json({ error: 'Control not found' }, { status: 404 });
    }

    // Update control
    const updatedControl = await prisma.control.update({
      where: { id: existingControl.id },
      data: {
        status: status || existingControl.status,
        completed: completed !== undefined ? completed : existingControl.completed,
        lastUpdated: new Date(),
      },
    });

    // Add comment if provided
    if (comment) {
      await prisma.comment.create({
        data: {
          content: comment,
          controlId: existingControl.id,
          createdBy: 'Current User', // TODO: Get from auth session
        },
      });
    }

    return NextResponse.json(updatedControl);
  } catch (error) {
    console.error('Error updating control:', error);
    return NextResponse.json({ error: 'Failed to update control' }, { status: 500 });
  }
}

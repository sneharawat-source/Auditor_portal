import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET single control by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const control = await prisma.control.findUnique({
      where: { id: params.id },
      include: {
        comments: {
          orderBy: { createdAt: 'desc' },
        },
        evidence: {
          orderBy: { uploadedAt: 'desc' },
        },
        policies: {
          orderBy: { createdAt: 'desc' },
        },
        framework: true,
      },
    });

    if (!control) {
      return NextResponse.json({ error: 'Control not found' }, { status: 404 });
    }

    return NextResponse.json(control);
  } catch (error) {
    console.error('Error fetching control:', error);
    return NextResponse.json({ error: 'Failed to fetch control' }, { status: 500 });
  }
}

// PATCH update control
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { status, completed, owner, riskLevel, dueDate } = body;

    const updatedControl = await prisma.control.update({
      where: { id: params.id },
      data: {
        ...(status && { status }),
        ...(completed !== undefined && { completed }),
        ...(owner && { owner }),
        ...(riskLevel && { riskLevel }),
        ...(dueDate && { dueDate: new Date(dueDate) }),
        lastUpdated: new Date(),
      },
      include: {
        comments: true,
        evidence: true,
        policies: true,
      },
    });

    return NextResponse.json(updatedControl);
  } catch (error) {
    console.error('Error updating control:', error);
    return NextResponse.json({ error: 'Failed to update control' }, { status: 500 });
  }
}

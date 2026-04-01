import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET comments for a control
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const comments = await prisma.comment.findMany({
      where: { controlId: params.id },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
}

// POST add comment to control
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { content, createdBy } = body;

    if (!content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        controlId: params.id,
        createdBy: createdBy || 'Current User',
      },
    });

    // Create activity log
    await prisma.activity.create({
      data: {
        action: 'Comment Added',
        details: `Comment added to control`,
        controlId: params.id,
        userId: createdBy || 'system', // TODO: Get from auth session
      },
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 });
  }
}

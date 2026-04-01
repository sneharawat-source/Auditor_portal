import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET evidence for a control
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const evidence = await prisma.evidence.findMany({
      where: { controlId: params.id },
      orderBy: { uploadedAt: 'desc' },
    });

    return NextResponse.json(evidence);
  } catch (error) {
    console.error('Error fetching evidence:', error);
    return NextResponse.json({ error: 'Failed to fetch evidence' }, { status: 500 });
  }
}

// POST add evidence to control
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { fileName, fileUrl, fileType, uploadedBy } = body;

    if (!fileName || !fileUrl) {
      return NextResponse.json({ error: 'fileName and fileUrl are required' }, { status: 400 });
    }

    const evidence = await prisma.evidence.create({
      data: {
        fileName,
        fileUrl,
        fileType: fileType || 'application/pdf',
        controlId: params.id,
        uploadedBy: uploadedBy || 'Current User',
      },
    });

    // Create activity log
    await prisma.activity.create({
      data: {
        action: 'Evidence Uploaded',
        details: `Evidence file "${fileName}" uploaded`,
        controlId: params.id,
        userId: uploadedBy || 'system', // TODO: Get from auth session
      },
    });

    return NextResponse.json(evidence, { status: 201 });
  } catch (error) {
    console.error('Error uploading evidence:', error);
    return NextResponse.json({ error: 'Failed to upload evidence' }, { status: 500 });
  }
}

// DELETE evidence
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const evidenceId = searchParams.get('evidenceId');

    if (!evidenceId) {
      return NextResponse.json({ error: 'evidenceId is required' }, { status: 400 });
    }

    await prisma.evidence.delete({
      where: { id: evidenceId },
    });

    return NextResponse.json({ message: 'Evidence deleted successfully' });
  } catch (error) {
    console.error('Error deleting evidence:', error);
    return NextResponse.json({ error: 'Failed to delete evidence' }, { status: 500 });
  }
}

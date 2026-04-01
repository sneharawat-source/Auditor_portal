import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET audit settings
export async function GET() {
  try {
    const settings = await prisma.auditSettings.findFirst({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching audit settings:', error);
    return NextResponse.json({ error: 'Failed to fetch audit settings' }, { status: 500 });
  }
}

// POST update audit settings
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { organization, framework, auditPeriodStart, auditPeriodEnd } = body;

    // Delete old settings and create new one
    await prisma.auditSettings.deleteMany({});

    const settings = await prisma.auditSettings.create({
      data: {
        organization,
        framework,
        auditPeriodStart: new Date(auditPeriodStart),
        auditPeriodEnd: new Date(auditPeriodEnd),
      },
    });

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error updating audit settings:', error);
    return NextResponse.json({ error: 'Failed to update audit settings' }, { status: 500 });
  }
}

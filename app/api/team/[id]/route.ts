import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// PATCH update team member
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { name, email, role, department, assignedControls } = body;

    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data: {
        ...(name && { name }),
        ...(email && { email }),
        ...(role && { role }),
      },
      include: {
        teamMemberships: true,
      },
    });

    // Update team membership if department or assignedControls changed
    if (department !== undefined || assignedControls !== undefined) {
      const membership = await prisma.teamMember.findFirst({
        where: { userId: params.id },
      });

      if (membership) {
        await prisma.teamMember.update({
          where: { id: membership.id },
          data: {
            ...(department && { department }),
            ...(assignedControls && { assignedControls }),
          },
        });
      }
    }

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating team member:', error);
    return NextResponse.json({ error: 'Failed to update team member' }, { status: 500 });
  }
}

// DELETE team member
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.user.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Team member deleted successfully' });
  } catch (error) {
    console.error('Error deleting team member:', error);
    return NextResponse.json({ error: 'Failed to delete team member' }, { status: 500 });
  }
}

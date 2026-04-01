const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Import framework controls
const frameworkControlsData = {
  'SOC 2 Type II': [
    { controlId: 'CC1.1', name: 'Control Environment - Integrity and Ethics', description: 'The entity demonstrates a commitment to integrity and ethical values.', owner: 'Michael Chen', status: 'passing', riskLevel: 'high' },
    { controlId: 'CC1.2', name: 'Board Independence', description: 'The board of directors demonstrates independence from management.', owner: 'Sarah Johnson', status: 'passing', riskLevel: 'high' },
    { controlId: 'CC1.3', name: 'Organizational Structure', description: 'Management establishes structures, reporting lines, and authorities.', owner: 'Emily Rodriguez', status: 'in_review', riskLevel: 'medium' },
    { controlId: 'CC1.4', name: 'Commitment to Competence', description: 'The entity demonstrates a commitment to attract, develop, and retain competent individuals.', owner: 'David Martinez', status: 'passing', riskLevel: 'medium' },
    { controlId: 'CC1.5', name: 'Accountability', description: 'The entity holds individuals accountable for their internal control responsibilities.', owner: 'Rachel Kim', status: 'pending', riskLevel: 'medium' },
  ],
};

async function main() {
  console.log('Starting database seed...');

  // Create users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'michael.chen@surepass.com',
        name: 'Michael Chen',
        password: 'temp-password',
        role: 'admin',
      },
    }),
    prisma.user.create({
      data: {
        email: 'sarah.johnson@surepass.com',
        name: 'Sarah Johnson',
        password: 'temp-password',
        role: 'auditor',
      },
    }),
    prisma.user.create({
      data: {
        email: 'emily.rodriguez@surepass.com',
        name: 'Emily Rodriguez',
        password: 'temp-password',
        role: 'compliance',
      },
    }),
    prisma.user.create({
      data: {
        email: 'david.martinez@surepass.com',
        name: 'David Martinez',
        password: 'temp-password',
        role: 'manager',
      },
    }),
    prisma.user.create({
      data: {
        email: 'rachel.kim@surepass.com',
        name: 'Rachel Kim',
        password: 'temp-password',
        role: 'auditor',
      },
    }),
  ]);

  console.log(`Created ${users.length} users`);

  // Create team memberships
  for (const user of users) {
    await prisma.teamMember.create({
      data: {
        userId: user.id,
        department: user.role === 'admin' ? 'Management' : user.role === 'compliance' ? 'Compliance' : 'Audit',
        assignedControls: [],
      },
    });
  }

  console.log('Created team memberships');

  // Create frameworks
  const frameworks = await Promise.all([
    prisma.framework.create({
      data: {
        name: 'SOC 2 Type II',
        description: 'Service Organization Control 2 Type II - Security, Availability, Processing Integrity, Confidentiality, and Privacy',
      },
    }),
    prisma.framework.create({
      data: {
        name: 'ISO 27001',
        description: 'International Standard for Information Security Management Systems',
      },
    }),
    prisma.framework.create({
      data: {
        name: 'HIPAA',
        description: 'Health Insurance Portability and Accountability Act',
      },
    }),
    prisma.framework.create({
      data: {
        name: 'PCI-DSS',
        description: 'Payment Card Industry Data Security Standard',
      },
    }),
    prisma.framework.create({
      data: {
        name: 'GDPR',
        description: 'General Data Protection Regulation',
      },
    }),
  ]);

  console.log(`Created ${frameworks.length} frameworks`);

  // Create controls for SOC 2 Type II
  const soc2Framework = frameworks.find(f => f.name === 'SOC 2 Type II');
  const controlsData = frameworkControlsData['SOC 2 Type II'];

  for (const controlData of controlsData) {
    await prisma.control.create({
      data: {
        controlId: controlData.controlId,
        name: controlData.name,
        description: controlData.description,
        frameworkId: soc2Framework.id,
        owner: controlData.owner,
        status: controlData.status,
        riskLevel: controlData.riskLevel,
        completed: controlData.status === 'passing',
        dueDate: new Date('2025-12-31'),
      },
    });
  }

  console.log(`Created ${controlsData.length} controls for SOC 2 Type II`);

  // Create audit settings
  await prisma.auditSettings.create({
    data: {
      organization: 'Surepass Technologies',
      framework: 'SOC 2 Type II',
      auditPeriodStart: new Date('2025-01-01'),
      auditPeriodEnd: new Date('2025-12-31'),
    },
  });

  console.log('Created audit settings');

  // Create sample activities
  const controls = await prisma.control.findMany({ take: 3 });
  if (controls.length > 0) {
    await prisma.activity.create({
      data: {
        action: 'Status Updated',
        details: 'Control status changed to passing',
        controlId: controls[0].id,
        userId: users[1].id,
        changes: 'Status: pending → passing',
      },
    });

    await prisma.activity.create({
      data: {
        action: 'Evidence Uploaded',
        details: 'New evidence document added',
        controlId: controls[0].id,
        userId: users[0].id,
      },
    });

    await prisma.activity.create({
      data: {
        action: 'Comment Added',
        details: 'Added review comment',
        controlId: controls[1].id,
        userId: users[2].id,
      },
    });

    await prisma.activity.create({
      data: {
        action: 'Control Assigned',
        details: 'Control assigned to team member',
        controlId: controls[2].id,
        userId: users[0].id,
      },
    });
  }

  console.log('Created sample activities');

  // Create sample notifications
  await prisma.notification.create({
    data: {
      title: 'Control Review Required',
      message: 'CC1.3 requires your review',
      type: 'info',
      userId: users[1].id,
      link: '/framework',
    },
  });

  await prisma.notification.create({
    data: {
      title: 'Task Assigned',
      message: 'You have been assigned a new audit task',
      type: 'info',
      userId: users[2].id,
      link: '/tasks',
    },
  });

  await prisma.notification.create({
    data: {
      title: 'Evidence Uploaded',
      message: 'New evidence has been uploaded for CC1.1',
      type: 'success',
      userId: users[1].id,
      link: '/control/CC1.1',
    },
  });

  console.log('Created sample notifications');

  // Create sample tasks
  if (controls.length > 0) {
    await prisma.task.create({
      data: {
        title: 'Review Access Control Policies',
        description: 'Complete review of all access control policies and procedures',
        priority: 'high',
        status: 'in_progress',
        controlId: controls[0].controlId,
        assignedToId: users[1].id,
        dueDate: new Date('2025-03-15'),
        notes: 'Focus on privileged access management',
      },
    });

    await prisma.task.create({
      data: {
        title: 'Update Security Documentation',
        description: 'Update security policies to reflect current practices',
        priority: 'medium',
        status: 'open',
        controlId: controls[1].controlId,
        assignedToId: users[2].id,
        dueDate: new Date('2025-03-20'),
      },
    });
  }

  console.log('Created sample tasks');

  console.log('Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

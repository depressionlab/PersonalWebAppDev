import { prisma } from './client.ts';

await prisma.people.create({ data: { age: 2, name: 'dasjd' } });

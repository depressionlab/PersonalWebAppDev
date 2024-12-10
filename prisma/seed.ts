import { prisma } from './client.ts';

await prisma.people.create({ data: { age: 2, name: 'dasjd' } });
await prisma.people[Symbol('K')].types.fields.age.isList;

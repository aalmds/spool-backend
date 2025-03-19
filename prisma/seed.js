import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const educationists = [
    'Ana Costa', 'Carlos Pereira', 'Mariana Silva', 'Lucas Almeida', 'Fernanda Souza',
    'Rafael Oliveira', 'Beatriz Gomes', 'Gustavo Martins', 'Paula Rocha', 'João Santos',
    'Tatiane Alves', 'Ricardo Dias', 'Aline Costa', 'Felipe Lima', 'Marta Ferreira',
    'Eduardo Ribeiro', 'Juliana Pires', 'Paulo Mendes', 'Carla Martins', 'Simone Rocha'
  ];

  const specializations = ['Cuidador(a)', 'Professor(a)'];

  for (let i = 0; i < educationists.length; i++) {
    const randomSpecialization = specializations[Math.floor(Math.random() * specializations.length)];
    await prisma.educationist.create({
      data: {
        name: educationists[i],
        email: `educationist${i + 1}@example.com`,
        specialization: randomSpecialization,
      },
    });
  }

  const therapists = [
    'João Costa', 'Mariana Oliveira', 'Felipe Silva', 'Ana Mendes', 'Ricardo Souza',
    'Juliana Lima', 'Gustavo Rocha', 'Luciana Santos', 'Paula Ferreira', 'Carlos Ribeiro',
    'Tatiane Pires', 'Aline Martins', 'Eduardo Gomes', 'Fernanda Almeida', 'Luiz Rocha',
    'Carla Pereira', 'Rafael Gomes', 'Simone Silva', 'Marta Alves', 'Beatriz Ribeiro'
  ];

  for (let i = 0; i < therapists.length; i++) {
    const licenseNumber = String(i + 1).padStart(3, '0');
    await prisma.therapist.create({
      data: {
        name: therapists[i],
        email: `therapist${i + 1}@example.com`,
        licenseNumber: licenseNumber,
      },
    });
  }

  // Criação de 20 Children (idade até 10 anos)
  const children = [
    'Lucas', 'Gabriela', 'Pedro', 'Isabela', 'Henrique', 'Larissa', 'Sofia', 'Miguel', 'Rafaela', 'Arthur',
    'Maria', 'Beatriz', 'Davi', 'Mariana', 'Eduardo', 'Isadora', 'Felipe', 'Alice', 'Roberta', 'Gustavo'
  ];

  const parentNames = [
    'Carlos', 'Fernanda', 'Juliana', 'Roberto', 'Tatiane', 'Pedro', 'Lucas', 'Camila', 'Paula', 'Ana',
    'Ricardo', 'Gustavo', 'Rita', 'Beatriz', 'Vitor', 'Eduardo', 'Marta', 'Paulo', 'Simone', 'Aline'
  ];

  // Criar Children
  for (let i = 0; i < children.length; i++) {
    const randomAge = Math.floor(Math.random() * 11);
    const birthYear = new Date().getFullYear() - randomAge;
    const birthMonth = Math.floor(Math.random() * 12);
    const birthDay = Math.floor(Math.random() * 28) + 1;

    const birthDate = new Date(birthYear, birthMonth, birthDay);

    await prisma.child.create({
      data: {
        name: children[i],
        parentName: parentNames[i],
        email: `child${i + 1}@example.com`,
        birthDate: birthDate,
        supportLevel: i % 3 + 1,
      },
    });
  }

  const allChildren = await prisma.child.findMany();
  const allEducationists = await prisma.educationist.findMany();
  const allTherapists = await prisma.therapist.findMany();

  for (const child of allChildren) {
    await prisma.childEducationist.create({
      data: {
        childId: child.id,
        educationistId: allEducationists[Math.floor(Math.random() * allEducationists.length)].id,
      },
    });

    await prisma.childTherapist.create({
      data: {
        childId: child.id,
        therapistId: allTherapists[Math.floor(Math.random() * allTherapists.length)].id,
      },
    });
  }

  const recordContents = [
    "Está se comportando muito bem na escola, sempre colaborando com os colegas e respeitando os turnos de fala. No entanto, ainda precisa de ajuda para se manter focado nas atividades mais longas.",
    "Tem demonstrado grande interesse nas atividades, mas ainda tem dificuldades em lidar com a frustração quando algo não sai como o esperado. Está aprendendo a pedir ajuda quando necessário.",
    "Está sendo muito educado com todos na escola, mas às vezes se distrai facilmente com estímulos ao seu redor, o que afeta sua concentração nas tarefas.",
    "Tem mostrado ótimo progresso nas interações sociais, mas tende a ficar sobrecarregado em ambientes muito movimentados, o que gera algum estresse.",
    "Está mais envolvido nas atividades de grupo, mas ainda apresenta resistência a mudanças de rotina, o que exige paciência e apoio.",
    "Tem um excelente relacionamento com seus colegas e adora ajudar nas tarefas, embora precise de suporte adicional para seguir as instruções de forma independente.",
    "Tem mostrado muito entusiasmo por novas atividades, porém às vezes se torna excessivamente ansioso quando não consegue terminar algo rapidamente.",
    "É muito atento aos detalhes e adora observar o que acontece ao seu redor, mas em algumas situações prefere não participar de discussões em grupo.",
    "Tem mostrado ótimo progresso em sua comunicação verbal, mas ainda se irrita com mudanças repentinas de planos e precisa de apoio para se acalmar.",
    "Está evoluindo bem na gestão das suas emoções e está mais participativo nas atividades escolares, embora precise de lembretes frequentes para seguir os passos das tarefas.",
    "Adora participar de atividades de leitura, mas às vezes se perde na tarefa e precisa de mais apoio para finalizar.",
    "Está muito criativo e adora explorar novas ideias, mas às vezes perde o foco durante atividades mais longas e precisa de orientação para se manter engajado.",
    "Tem sido muito sociável e gentil, mas pode se sentir sobrecarregado em ambientes com muitas pessoas, o que às vezes leva a comportamentos de evitamento.",
    "Está se saindo muito bem nas atividades motoras, mas ainda tem dificuldades em iniciar interações com os outros sem orientação.",
    "Está mais tranquila e disposta a interagir, mas em situações de transição, pode ficar confusa e precisar de um tempo para se ajustar.",
    "Adora participar de atividades e está bem focado nas tarefas, mas ainda precisa de ajuda para organizar suas ideias e ações de maneira independente.",
    "Está bem atenta às instruções e tem seguido a rotina escolar com bastante consistência, embora ainda precise de ajuda com a comunicação não verbal.",
    "Está muito organizada e gosta de planejar suas atividades, mas pode ficar muito ansiosa quando as coisas não saem como o esperado.",
    "Tem demonstrado mais interesse nas interações sociais e tem feito progressos significativos, mas ainda precisa de orientação nas atividades em grupo.",
    "Está com uma boa atitude em relação às atividades, mas pode se sentir mais confortável com mais tempo e apoio para concluir as tarefas.",
    "Está evoluindo nas interações sociais, mas ainda tem dificuldades em expressar seus sentimentos de forma clara, o que gera frustração."
  ];

  const allChildrenIds = allChildren.map(child => child.id);
  const allEducationistsIds = allEducationists.map(educationist => educationist.id);
  const allTherapistsIds = allTherapists.map(therapist => therapist.id);

  const authorRoles = ['Therapist', 'Educationist', 'Child']; 

  for (let i = 0; i < 20; i++) {
    const randomAuthorRole = authorRoles[Math.floor(Math.random() * authorRoles.length)];
    let authorId;

    if (randomAuthorRole === 'Therapist') {
      authorId = allTherapistsIds[Math.floor(Math.random() * allTherapistsIds.length)];
    } else if (randomAuthorRole === 'Educationist') {
      authorId = allEducationistsIds[Math.floor(Math.random() * allEducationistsIds.length)];
    } else {
      authorId = allChildrenIds[Math.floor(Math.random() * allChildrenIds.length)];
    }

    const randomContent = recordContents[Math.floor(Math.random() * recordContents.length)];

    await prisma.record.create({
      data: {
        childId: allChildrenIds[Math.floor(Math.random() * allChildrenIds.length)],
        authorId: authorId,
        authorRole: randomAuthorRole,
        content: randomContent,
      },
    });
  }

  const allRecords = await prisma.record.findMany();
  const allUsersIds = [
    ...allEducationists.map(edu => edu.id),
    ...allTherapists.map(ther => ther.id),
    ...allChildren.map(child => child.id)
  ];

  for (let i = 0; i < allRecords.length/2; i++) {
    
    const randomUsers = allUsersIds.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 5) + 1); 
    for (const userId of randomUsers) {
      
      let userRole = 'Child'; 
      if (allEducationists.find(edu => edu.id === userId)) userRole = 'Educationist';
      if (allTherapists.find(therapist => therapist.id === userId)) userRole = 'Therapist';

      await prisma.recordRead.create({
        data: {
          recordId: allRecords[i].id,
          userId: userId,
          userRole: userRole,
          readAt: new Date(),  
        },
      });
    }
  }
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

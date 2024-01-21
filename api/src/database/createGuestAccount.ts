import { IssuePriority, IssueStatus, IssueType } from 'constants/issues';
import { ProjectCategory } from 'constants/projects';
import { Comment, Issue, Project, User } from 'entities';

import { createEntity } from 'utils/typeorm';

const seedUsers = (): Promise<User[]> => {
  const users = [
    createEntity(User, {
      email: 'sueda@omu.com',
      name: 'Sueda Cakmak',
      avatarUrl: 'https://r.resimlink.com/1-LjRvUamCM.jpeg?v=8403ceff339db7fefb105ef20bcfe7e4',
    }),
    createEntity(User, {
      email: 'sueda@omu.com',
      name: 'Elif ay',
      avatarUrl: 'https://r.resimlink.com/rg12ZCufe.jpeg?v=1b0930dbadb6b227d3d70d37a46f29e7',
    }),
    createEntity(User, {
      email: 'ummugulsum@omu.com',
      name: 'ümmügülsüm güneş',
      avatarUrl: 'https://r.resimlink.com/H5vTza.jpeg?v=7effbf236ef11e4eaaf221b461dc391f',
    }),
  ];
  return Promise.all(users);
};

const seedProject = (users: User[]): Promise<Project> =>
  createEntity(Project, {
    name: 'Omu VTYS',
    url: 'https://www.atlassian.com/software/jira',
    description:
      'Plan, track, and manage your agile and software development projects in Jira. Customize your workflow, collaborate, and release great software.',
    category: ProjectCategory.SOFTWARE,
    users,
  });

const seedIssues = (project: Project): Promise<Issue[]> => {
  const { users } = project;

  const issues = [
    createEntity(Issue, {
      title: 'Ornek task basligi',
      type: IssueType.TASK,
      status: IssueStatus.BACKLOG,
      priority: IssuePriority.HIGH,
      listPosition: 1,
      description: ``,
      estimate: 8,
      timeSpent: 4,
      reporterId: users[1].id,
      project,
      users: [users[0]],
    }),
  ];
  return Promise.all(issues);
};

const seedComments = (issues: Issue[], users: User[]): Promise<Comment[]> => {
  const comments = [
    createEntity(Comment, {
      body: 'Ornek',
      issueId: issues[0].id,
      userId: users[2].id,
    }),
  ];
  return Promise.all(comments);
};

const createGuestAccount = async (): Promise<User> => {
  const users = await seedUsers();
  const project = await seedProject(users);
  const issues = await seedIssues(project);
  console.log('issues', issues);
  await seedComments(issues, project.users);
  return users[2];
};

export default createGuestAccount;

import { stringify } from 'querystring';

export const defaultUsers = [
  {
    id: '6bdee06d-dfd5-40b3-a3f9-519f24a610e7',
    name: 'Trần Nguyễn Duy Khánh',
    email: 'duykhanhtran17062003@gmail.com',
    avatar:
      'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-Cutout.png',
    password: '$2a$12$3VncVoMACaQFqCA1qBlMEeITmXx276ZPYkydtbQhZTwZCWC.Cu3KC',
  },
  {
    id: '8ac42d37-9161-42d3-8973-5dd153a4ad88',
    name: 'Duy Khánh DTUers',
    email: 'trannduykhanh@dtu.edu.vn',
    avatar:
      'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
    password: '$2a$12$vVor/4NNM9D4.JYIyYIkJu386T6Wv6hNX7kC7ecOGtOuhHTD.IG3a',
  },
  {
    id: '5cc9f5c5-3ccd-4620-8f33-272186db91d2',
    name: 'Tran Nguyen Duy Khanh',
    email: 'tnduykhanhdng@gmail.com',
    avatar:
      'https://www.pngkey.com/png/full/72-729716_user-avatar-png-graphic-free-download-icon.png',
    password: '$2a$12$PhV93jF.Vj.twb.yYjMU4eibgvAeaw9x5z12sImGJo2aqdKBr6B1a',
  },
];
export const memberData = [
  {
    id: '6bdee06d-dfd5-40b3-a3f9-519f24a610e7',
    projectId: '61707d2c-91de-4e39-b605-7f4a4a74f039',
  },
  {
    id: '8ac42d37-9161-42d3-8973-5dd153a4ad88',
    projectId: '61707d2c-91de-4e39-b605-7f4a4a74f039',
  },
  {
    id: '5cc9f5c5-3ccd-4620-8f33-272186db91d2',
    projectId: '61707d2c-91de-4e39-b605-7f4a4a74f039',
  },
];
export const sprintData = [
  {
    id: '7e0e5d87-1c68-4260-8a6a-6c4ff5c73798',
    name: 'Sprint-0',
    description: '',
    duration: 'custom',
    startDate: '2024-08-06T00:10:27.304Z',
    endDate: '2024-08-09T00:00:00.000Z',
    creatorId: '6bdee06d-dfd5-40b3-a3f9-519f24a610e7',
    createdAt: '2024-08-06T00:09:20.381Z',
    updatedAt: '2024-08-06T00:10:36.812Z',
    deletedAt: null,
    status: 'ACTIVE',
  },
];
export const issueData = [
  {
    id: 'be2ace55-8744-419f-8ff1-414e00484e6a',
    key: 'Issue-1',
    name: 'Dialog edit user not show',
    description: null,
    status: 'TODO',
    type: 'BUG',
    sprintPosition: 1.0,
    boardPosition: -1.0,
    reporterId: '8ac42d37-9161-42d3-8973-5dd153a4ad88',
    assigneeId: '6bdee06d-dfd5-40b3-a3f9-519f24a610e7',
    parentId: null,
    sprintId: null,
    isDeleted: false,
    createdAt: '2024-08-06T00:11:15.156Z',
    updatedAt: '2024-08-06T00:11:34.735Z',
    deletedAt: null,
    sprintColor: null,
    creatorId: '8ac42d37-9161-42d3-8973-5dd153a4ad88',
  },
  {
    id: '45463761-7f64-48ef-991b-4e43b30f8252',
    key: 'Issue-1 (Sprint-0)',
    name: 'Create user',
    description: null,
    status: 'DONE',
    type: 'TASK',
    sprintPosition: 1.0,
    boardPosition: -1.0,
    reporterId: '6bdee06d-dfd5-40b3-a3f9-519f24a610e7',
    assigneeId: null,
    parentId: null,
    sprintId: '7e0e5d87-1c68-4260-8a6a-6c4ff5c73798',
    isDeleted: false,
    createdAt: '2024-08-06T00:09:32.591Z',
    updatedAt: '2024-08-06T00:11:52.220Z',
    deletedAt: null,
    sprintColor: null,
    creatorId: '6bdee06d-dfd5-40b3-a3f9-519f24a610e7',
  },
  {
    id: 'd5984a40-dc59-414b-85c6-0f9c785ed2c2',
    key: 'Issue-2 (Sprint-0)',
    name: 'Update user',
    description: null,
    status: 'IN_PROGRESS',
    type: 'TASK',
    sprintPosition: 2.0,
    boardPosition: -1.0,
    reporterId: '6bdee06d-dfd5-40b3-a3f9-519f24a610e7',
    assigneeId: null,
    parentId: null,
    sprintId: '7e0e5d87-1c68-4260-8a6a-6c4ff5c73798',
    isDeleted: false,
    createdAt: '2024-08-06T00:10:11.028Z',
    updatedAt: '2024-08-06T00:11:56.604Z',
    deletedAt: null,
    sprintColor: null,
    creatorId: '6bdee06d-dfd5-40b3-a3f9-519f24a610e7',
  },
  {
    id: '3d697d26-6d11-4deb-b55b-393648ee690c',
    key: 'Issue-3 (Sprint-0)',
    name: 'Find user by id',
    description: null,
    status: 'DONE',
    type: 'TASK',
    sprintPosition: 3.0,
    boardPosition: -1.0,
    reporterId: '6bdee06d-dfd5-40b3-a3f9-519f24a610e7',
    assigneeId: null,
    parentId: null,
    sprintId: '7e0e5d87-1c68-4260-8a6a-6c4ff5c73798',
    isDeleted: false,
    createdAt: '2024-08-06T00:10:20.875Z',
    updatedAt: '2024-08-06T00:12:05.745Z',
    deletedAt: null,
    sprintColor: null,
    creatorId: '6bdee06d-dfd5-40b3-a3f9-519f24a610e7',
  },
];

export const projectData = [
  {
    id: '61707d2c-91de-4e39-b605-7f4a4a74f039',
    key: 'software-project-management',
    name: 'Software project management',
    defaultAssignee: null,
    imageUrl: null,
    createdAt: '2024-08-04T21:31:18.347Z',
    updatedAt: '2024-08-04T21:31:18.347Z',
    deletedAt: null,
  },
];

export const commentData = [
  {
    id: 'c426e8a3-349b-4852-ace4-7fb746a1970e',
    content: {
      root: {
        children: [
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Viết thêm hàm find đi, cho dễ nhìn :v',
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'paragraph',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'root',
        version: 1,
      },
    },
    authorId: '8ac42d37-9161-42d3-8973-5dd153a4ad88',
    createdAt: '2024-08-06T00:25:09.716Z',
    updatedAt: '2024-08-06T00:25:09.716Z',
    isDeleted: false,
    issueId: 'be2ace55-8744-419f-8ff1-414e00484e6a',
  },
  {
    id: 'e5bbcced-891e-46d3-ba6d-26b0536677f0',
    content: {
      root: {
        children: [
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Ok nè :))',
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'paragraph',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'root',
        version: 1,
      },
    },
    authorId: '6bdee06d-dfd5-40b3-a3f9-519f24a610e7',
    createdAt: '2024-08-06T00:25:45.006Z',
    updatedAt: '2024-08-06T00:25:45.006Z',
    isDeleted: false,
    issueId: 'be2ace55-8744-419f-8ff1-414e00484e6a',
  },
];

export const conversationData = [
  {
    id: '66aff327c6e65a0b06c65cd5',
    title: 'Software project management',
    projectId: '61707d2c-91de-4e39-b605-7f4a4a74f039',
    participants: [
      {
        id: '6bdee06d-dfd5-40b3-a3f9-519f24a610e7',
        name: 'Trần Nguyễn Duy Khánh',
        email: 'duykhanhtran17062003@gmail.com',
      },
      {
        id: '8ac42d37-9161-42d3-8973-5dd153a4ad88',
        name: 'Duy Khánh DTUers',
        email: 'trannduykhanh@dtu.edu.vn',
      },
      {
        id: '5cc9f5c5-3ccd-4620-8f33-272186db91d2',
        name: 'Tran Nguyen Duy Khanh',
        email: 'tnduykhanhdng@gmail.com',
      },
    ],
    createdAt: '2024-08-04T21:31:18.947Z',
    updatedAt: '2024-08-04T21:31:18.947Z',
    createdBy: {
      id: '6bdee06d-dfd5-40b3-a3f9-519f24a610e7',
      name: 'Trần Nguyễn Duy Khánh',
      email: 'duykhanhtran17062003@gmail.com',
    },
  },
];
export const messageData = [
  {
    id: '66b16ca37ac38f83ac10b8fd',
    message: 'Mai liên hoan hả mấy anh kkkk',
    senderId: '8ac42d37-9161-42d3-8973-5dd153a4ad88',
    conversationId: '66aff327c6e65a0b06c65cd5',
    createdAt: '2024-08-06T00:21:55.176Z',
    updatedAt: '2024-08-06T00:21:55.176Z',
    isDeleted: false,
  },
  {
    id: '66b16cb37ac38f83ac10b8fe',
    message: 'Ời, 6h có mặt đông đủ nghe ',
    senderId: '6bdee06d-dfd5-40b3-a3f9-519f24a610e7',
    conversationId: '66aff327c6e65a0b06c65cd5',
    createdAt: '2024-08-06T00:22:11.141Z',
    updatedAt: '2024-08-06T00:22:11.141Z',
    isDeleted: false,
  },
  {
    id: '66b16cbd7ac38f83ac10b8ff',
    message: 'xong task nhanh mai quậy',
    senderId: '6bdee06d-dfd5-40b3-a3f9-519f24a610e7',
    conversationId: '66aff327c6e65a0b06c65cd5',
    createdAt: '2024-08-06T00:22:21.288Z',
    updatedAt: '2024-08-06T00:22:21.288Z',
    isDeleted: false,
  },
  {
    id: '66b16cc67ac38f83ac10b900',
    message: '<3',
    senderId: '8ac42d37-9161-42d3-8973-5dd153a4ad88',
    conversationId: '66aff327c6e65a0b06c65cd5',
    createdAt: '2024-08-06T00:22:30.118Z',
    updatedAt: '2024-08-06T00:22:30.118Z',
    isDeleted: false,
  },
];

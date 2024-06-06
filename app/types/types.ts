export type CredentialsType = {
  email: string;
  id: string;
  password?: string;
  name?: string;
  userName?: string;
};

export type OAuthType = {
  id: string;
  name?: string;
  email?: string;
  emailVerified?: boolean;
  image?: string;
};

export type User = CredentialsType | OAuthType;

export type UserContextType = {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
};

export type Test = {
  id?: string;
  title: string;
  duration: number;
  description: string;
  tags: string;
  ownTest: boolean;
  privatePost: boolean;
  questions?: QuestionType[];
  userId?: string;
};

export type QuestionType = {
  question: string;
  options: { option: string }[];
  answer: string;
  images?: string[];
};

export type TestInfo = {
  testId?: string;
  userId?: string;
  answers?: { questionIndex: number; answer: number }[];
  duration?: number;
};

export type TestInfoContextType = {
  testInfo: TestInfo | undefined;
  setTestInfo: React.Dispatch<React.SetStateAction<TestInfo | undefined>>;
};

export type TestContextType = {
  test: Test | undefined;
  setTest: React.Dispatch<React.SetStateAction<Test | undefined>>;
};

export type Post = {
  tests: Test;
  users: CredentialsType;
};

[
  {
    id: "c033e922-d837-4a14-a08f-bfd84ff380cb",
    message: "Hello this is roop here!.",
    createdAt: "2024-05-22T18:30:00.000Z",
    userId: "c8b6432e-4847-43a9-b2eb-69993b8944ca",
    postId: "60625432-b570-477d-9193-49caaf0f9c01",
    nestedComments: null,
  },
  {
    id: "506ecab3-ec1d-42ff-ae63-5560ee558886",
    message: "Hello this is roop again!",
    createdAt: "2024-05-22T18:30:00.000Z",
    userId: "c8b6432e-4847-43a9-b2eb-69993b8944ca",
    postId: "60625432-b570-477d-9193-49caaf0f9c01",
    nestedComments: null,
  },
];

export type ParentComment = {
  id: string;
  message: string;
  createdAt: string;
  userId: string;
  postId: string;
};

export type ChildrenComment = {
  nestedComments: {
    id: string;
    message: string;
    createdAt: string;
    userId: string;
    postId: string;
    user: CredentialsType;
  }[];
};
export type Comment = {
  comments: ParentComment & ChildrenComment & CredentialsType;
  users: CredentialsType;
};

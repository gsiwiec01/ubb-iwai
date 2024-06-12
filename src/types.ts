export type TaskData = {
  id: string;
  name: string;
  daily: boolean;
  isFinished: boolean;
}

export type SectionData = {
  id: string,
  name: string,
  tasks: TaskData[],
}
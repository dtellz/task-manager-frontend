export interface TaskDTO {
    id: number;
    title: string;
    status: number;
    priority: number;
    endTime?: Date;
}
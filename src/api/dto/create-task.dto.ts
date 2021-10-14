export interface CreateTaskDTO {
    title: string;
    status?: number;
    priority: number;
    endTime?: Date;
}
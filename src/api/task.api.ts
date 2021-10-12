import { TaskDTO } from "./dto/task.dto";

// we use this class to fecth the API for CRUD operations
export class TaskAPI {

    public static async getAll(): Promise<TaskDTO[]> {
        const resp = await fetch("http://localhost:3001/tasks", {
            method: "GET"
        });

        const data = await resp.json();

        return data;
    }

}
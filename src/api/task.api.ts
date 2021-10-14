import { CreateTaskDTO } from "./dto/create-task.dto";
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

    public static async deleteOne(id: number): Promise<TaskDTO> {
        const resp = await fetch(`http://localhost:3001/tasks/${id}`, {
            method: "DELETE"
        });

        const data = await resp.json();


        return data;

    }
    public static async createOne(createRequest: CreateTaskDTO) {

        const resp = await fetch('http://localhost:3001/tasks', {

            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(createRequest)
        });

        const data = await resp.json();

        return data;
    }
    public static async updateOne(updateRequest: CreateTaskDTO, id: Number) {
        const resp = await fetch(`http://localhost:3001/tasks/${id}`, {

            headers: {
                'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify(updateRequest)
        });

        const data = await resp.json();

        return data;
    }

}
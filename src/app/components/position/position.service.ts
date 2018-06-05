import { PositionModel } from "./position.model";
import { Position } from "./position.schema";
import { IPosition } from "./position.interface";

export class PositionService {
    public static getAll = async (): Promise<PositionModel[]> => {
        try {
            var position: PositionModel[] = await Position.find();
        } catch (error) {
            throw error;
        }

        return position;
    }

    public static create = async (credentials: IPosition): Promise<PositionModel> => {
        try {
            var position: PositionModel = await Position.create(credentials);
        } catch (error) {
            throw error;
        }

        return position;
    }

    public static delete = async (_id: String): Promise<void> => {
        try {
            var position = await Position.remove({ _id });
        } catch (error) {
            throw error;
        }

        return position;
    }
}
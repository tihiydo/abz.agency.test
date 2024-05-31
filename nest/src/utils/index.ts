import { validateSync } from "class-validator";
import { Response } from "express"

export const goodResponse = (res: Response, message?: string, object?: object) => 
{
    const response: any = {
        success: true
    };

    if (object !== undefined) 
    {
        Object.assign(response, object);
    }

    if (message !== undefined) 
    {
        response.message = message;
    }

    res.status(200).json(response)
}

export const badResponse = (res: Response, message?: string, object?: object) => 
{
    const response: any = {
        success: false
    };

    if (object !== undefined) 
    {
        Object.assign(response, object);
    }

    if (message !== undefined) 
    {
        response.message = message;
    }

    res.status(503).json(response)
}

export const generateRandomString = (count?: number) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

export function isValidDto(dto: any, obj: any): boolean {
    const instance = Object.assign(new dto(), obj);
    const errors = validateSync(instance);
    return errors.length === 0;
  }  
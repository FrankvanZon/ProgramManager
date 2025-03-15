import {z} from 'zod'

const requiredString = (fieldName: string) =>z
    .string({required_error:`${fieldName} is required`})
    .min(1,{message:`${fieldName} is required`})


export const projectSchema = z.object({
    name: requiredString('name'),
    description: requiredString('description'),
    cluster: requiredString('cluster'),
    category: requiredString('category'),
    team: requiredString('team'),
    


})

export type ProjectSchema = z.infer<typeof projectSchema>
import {z} from 'zod'
import { requiredString } from '../util/util'



export const projectSchema = z.object({
    name: requiredString('name'),
    description: requiredString('description'),
    cluster: requiredString('cluster'),
    category: requiredString('category'),
    team: requiredString('team'),
    


})

export type ProjectSchema = z.infer<typeof projectSchema>
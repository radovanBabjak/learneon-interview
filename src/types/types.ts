import * as Yup from 'yup';
import { launchesSchema, searchSchema } from './schemas';

export type searchValues = Yup.InferType<typeof searchSchema>

export type launches = Yup.InferType<typeof launchesSchema>

import * as Yup from 'yup';

export const searchSchema = Yup.object({

    spaceXSearch: Yup.string()
        .min(3, 'Must be at least 3 characters long')
        .required('Required')
});


export const launchesSchema = Yup.object({

    id: Yup.number().notRequired(),
    mission_name: Yup.string().notRequired(),
    links: Yup.object({
      mission_patch_small: Yup.string().notRequired()
    }).notRequired(),
    rocket: Yup.object({
      rocket_name: Yup.string().notRequired()
    }).notRequired(),
    details: Yup.string().notRequired(),
});

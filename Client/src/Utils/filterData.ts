import { FilterType } from "../Components/ui/TabFilter";

// ? Liste de filtre a affiché
export const RegisterFilters : FilterType = {
    date: 'date_inscription',
    select: [
        {
            name: 'status',
            label: 'Status',
            value: [
                { label: 'Actif', value: 1 },
                { label: 'Inactif', value: 0 },
            ]
        },
    ]
}
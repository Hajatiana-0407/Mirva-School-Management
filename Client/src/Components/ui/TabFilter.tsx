import { CalendarDays, Filter, Search, X } from 'lucide-react'
import { useState } from 'react'
import Input from './Input'
export type FilterType = {
    date?: string;
    select?: {
        name: string;
        label: string;
        value: {
            label: string,
            value: string | number
        }[]
    }[]
}
type TabFilterPropsType = {
    filters: FilterType;
    order?: string[]
}
/**
 * Component for filter
 * @param param0 
 * @returns 
 */
const TabFilter: React.FC<TabFilterPropsType> = ({ filters, order }) => {
    const [searchTerm, setSearchTerm] = useState('')

    // ? Prendre le nombre d'input a afficher 
    let inputFilterCount = 1 // Recherche par mot Cle 
    // Date 
    if (filters?.date) {
        inputFilterCount += 2; // Recherche date début et date de fin
    }
    // Select
    if (filters?.select) {
        inputFilterCount += filters.select.length;
    }



    // Creation de l'ordre 
    order ? order : order = ['word', 'date', 'select'];

    return (
        <div className="mb-6 md:mb-6 w-full ">
            <div className="flex justify-between space-x-4">
                <div className="flex flex-wrap  gap-2  gap-y-4 flex-1" >
                    {order.map((order) => {

                        // !Recherche par mot cle
                        if (order === 'word') return <>
                            <Input
                                label='Rechercher'
                                icon={Search}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                name=''
                            />
                        </>

                        // !Recherche par date
                        if (order === 'date') return <>
                            <Input
                                label='Date du début'
                                icon={CalendarDays}
                                // value={searchTerm}
                                // onChange={(e) => setSearchTerm(e.target.value)}
                                name=''
                                type='date'
                            />
                            <Input
                                label='Date fin'
                                icon={CalendarDays}
                                // value={searchTerm}
                                // onChange={(e) => setSearchTerm(e.target.value)}
                                name=''
                                type='date'
                            />
                        </>

                        // !Recherche avec une liste de selection
                        if (order === 'select') {
                            return filters.select?.map(item => (<>
                                <Input
                                    label={item.label}
                                    icon={CalendarDays}
                                    name=''
                                    type='select'
                                    options={item.value}
                                />
                            </>))
                        }
                    })}
                    <div className='flex flex-1 gap-2 justify-end'>
                        <button className="bg-primary-600 text-light px-2 py-1 sm:px-4 sm:py-2 _classe     rounded-lg flex items-center space-x-2 hover:bg-primary-700 transition-color">
                            <Filter className="w-4 h-4" />
                            <span>Filtres</span>
                        </button>
                        <button className="bg-slate-600 text-light px-2 py-1 sm:px-4 sm:py-2 _classe rounded-lg flex items-center space-x-2 hover:bg-slate-700 transition-color">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TabFilter
import { teamOptions } from "./teamOptions";

export default function filteredTeamsOptions(cluster: string, program: string) {
        const baseOptions = ['Not Assigned', 'GOO', 'Factory Dev'];
        const filteredTeamOptions = teamOptions.filter(option => {
            if (baseOptions.includes(option.value)) {
                return true;
            }
            if (cluster === 'Office' && option.value.includes('Office') || option.value.includes('BFR')) {
                return true;
            }
            if (cluster === 'Retail' && option.value.includes('Retail')) {
                return true;
            }
            if (cluster === 'Industry' && option.value.includes('Industry')) {
                return true;
            }
            if (cluster === 'Trunking' && option.value.includes('Trunking')) {
                return true;
            }
            if (cluster === 'Road & Street' && option.value.includes('Road & Street')) {
                return true;
            }
            if (cluster === 'Solar' && option.value.includes('Solar')) {
                return true;
            }
            if (cluster === 'Sport & Area' && option.value.includes('Sport & Area')) {
                return true;
            }
            if (cluster === 'Tunnel' && option.value.includes('Tunnel')) {
                return true;
            }
            if (cluster === 'Urban' && option.value.includes('Urban')) {
                return true;
            }
            if (program === 'Indoor' && option.value.includes('Indoor')) {
                return true;
            }
            if (program === 'Outdoor' && option.value.includes('Outdoor')) {
                return true;
            }
        return false;
        });
        return filteredTeamOptions;
        };
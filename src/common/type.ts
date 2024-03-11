type Itype = {
    inputs: [{
        id: number,
        type: string,
        name: string,
        label: string,
        helperText: string,
        placeholder: string,
        section: string,
        mandatory: boolean,
        filterfield: boolean,
        eightyc: boolean,
        eightyd: boolean,
        eightyggc: boolean,
        eightyg: boolean
    }]
    formHeading: {
        heading: string
    }
    isLoading: boolean
}

type Ftype = {
    annualBasicSalary: number;
    annualHra: number;
    elss: number;
    homePrincipal: number;
    lic: number;
    ngo: number;
    pf: number;
    politicalDonation: number;
    ppf: number;
}

type HandleNameChangeInterface = {
    target: HTMLInputElement;
}

interface IProps {
    handleSearchTyping(event: React.FormEvent<HTMLInputElement>): void;
}

type TextType = {
    onKeyDowns: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onChanges: (name: string, val: string) => void;
    errors: boolean;
    helperTexts: string;
    types: string;
    labels: string;
    names: string;
    variants: "outlined";
    autoCompletes: "off";
    maxLength: any;
};

export type {
    Ftype, Itype, HandleNameChangeInterface, IProps, TextType
};

export class Address {
    street: string;
}


export class Customer {
    id: number;
    add: Address;

    constructor(id: number) {
        this.id = id;
    }

    fooBar(): string {

        setTimeout(() => {
            console.log('ID', this.id);
        }, 2000);

        return '';
    }
}
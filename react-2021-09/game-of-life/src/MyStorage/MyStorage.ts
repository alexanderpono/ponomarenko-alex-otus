export class MyStorage {
    setName(name: string) {
        localStorage.setItem('name', name);
    }

    clearName() {
        localStorage.setItem('name', '');
    }

    getName(): string | null {
        if (localStorage.getItem('name')) {
            const name = localStorage.getItem('name');
            return name;
        }
        return null;
    }
}

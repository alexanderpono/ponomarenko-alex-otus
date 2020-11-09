import { TestStorage } from './models/TestStorage';
import { User, ITestData } from './interfaces';
import { AppStorage } from './models/AppStorage';

type ModelMode = 'test' | 'app';

let testModel: TestStorage | null = null;
let appModel: AppStorage | null = null;

export class ModelFactory {
    public static getModel(mode: ModelMode): TestStorage | AppStorage | null {
        if (mode === 'test') {
            if (testModel === null) {
                testModel = new TestStorage();
                testModel.setStartData(ModelFactory.createTestData());
            }
            return testModel;
        } else {
            if (appModel === null) {
                appModel = new AppStorage();
            }
            return appModel;
        }
    }

    private static createTestData(): ITestData {
        const Kate: User = { name: 'Kate' };
        const Peter: User = { name: 'Peter' };

        const startData: ITestData = {
            users: [Kate, Peter],
            courses: [
                { id: 'c1', caption: 'Mathematics' },
                { id: 'c2', caption: 'Physics' }
            ]
        };
        return startData;
    }
}

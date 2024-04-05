
interface configRun {
    size: number
}

interface TestScenarios {
    runUserCRUD(config: configRun): void
}

class TestScenarios implements TestScenarios {

 
}

export default new TestScenarios()

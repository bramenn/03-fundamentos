import { shallowMount } from '@vue/test-utils'
import Indecision from '@/components/Indecision'


describe('Indecision component', () => {
    let wrapper;
    let clgSpy;
    let getAnswerSpy;

    /////////////////////////
    // Esto es un mock de una peticion http
    global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve({
            answer: "yes",
            forced: false,
            image: "https://yesno.wtf/assets/yes/2.gif"

        })
    }))
    /////////////////////////

    beforeEach(() => {
        wrapper = shallowMount(Indecision)

        /////////////////////////
        //Esto es un mock
        getAnswerSpy = jest.spyOn(wrapper.vm, "getAnswer")
        /////////////////////////

        clgSpy = jest.spyOn(console, "log")

        jest.clearAllMocks()
    })

    test('Debe hacer match con el snapshot', () => {

        expect(wrapper.html()).toMatchSnapshot()
    })

    test('Escribir en el input no debe disparar nada (console.log)', async () => {

        let input = wrapper.find("input")
        await input.setValue("Hola mundo")
        expect(clgSpy).toHaveBeenCalledTimes(1)
        expect(getAnswerSpy).not.toHaveBeenCalled()
    })

    test('Escribir el simbolo de "?" debe disparar el getAnswer', async () => {

        let input = wrapper.find("input")
        await input.setValue("Hola mundo?")
        expect(getAnswerSpy).toHaveBeenCalledTimes(1)
    })

    test('Pruebas en getAnswer', async () => {
        await wrapper.vm.getAnswer()
        let img = wrapper.find("img")
        expect(img.exists()).toBeTruthy()
        expect(wrapper.vm.image).toBe("https://yesno.wtf/assets/yes/2.gif")
        expect(wrapper.vm.answer).toBe("Si!")
    })

    test('Pruebas en getAnswer - Fallo en el API', async () => {

        fetch.mockImplementationOnce(() => Promise.reject("API is down"))
        await wrapper.vm.getAnswer()

        let img = wrapper.find("img")
        expect(img.exists()).toBeFalsy()
        expect(wrapper.vm.answer).toBe("No se pudo realizar la consulta")

    })
})
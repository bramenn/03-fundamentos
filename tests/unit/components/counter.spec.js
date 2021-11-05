import { shallowMount } from '@vue/test-utils'
import Counter from '@/components/Counter'


describe('Counter component', () => {
    //Esta parte sirve para definir valores gobales para cada prueba
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(Counter)

    })

    //Prueba que evalua si un componente cambio
    test('Debe hacer match con el snapshot', () => {

        expect(wrapper.html()).toMatchSnapshot()
    })

    //Prueba que envalua si el contendio del primer h2 es el esperado
    test('h2 debe de tener el valor por defecto', () => {

        let h2Value = wrapper.find("h2").text()
        expect(h2Value).toBe("Counter")
    })

    //Prueba que busca un elemento espesifico y nos retorna el valor esperado
    test('El valor por defecto debe ser 100 en el p', () => {

        let value = wrapper.find('[data-testid="counter"]').text()
        expect(value).toBe("5")
    })

    //Prueba que cuando se da click decremente el valor de counter
    test("Debe decrementar el valor 1 en 1", async () => {

        let decreaseBtn = wrapper.find('button')
        await decreaseBtn.trigger('click')
        let value = wrapper.find('[data-testid="counter"]').text()
        expect(value).toBe("4")
    })

    //Prueba que cuando se da 2 click aumente el valor de counter
    test("Debe aumentar el valor inicial 2 veces", async () => {

        let plus = wrapper.find('[data-testid="plus"]')
        await plus.trigger('click')
        await plus.trigger('click')
        let value = wrapper.find('[data-testid="counter"]').text()
        expect(value).toBe("7")
    })

    //Prueba que verifica que el valor por defecto de los props este en la etiqueta
    test("Debe establecer el valor por defecto", () => {

        let { start } = wrapper.props()
        let value = wrapper.find('[data-testid="counter"]').text()
        expect(Number(value)).toBe(start)
    })

    //Envaindo una props en el componente, se cambie en la etiqueta
    test("Debe representar el titutlo enviado en el props", () => {
        let titleDefault = "Hola mundo"
        let wrapper = shallowMount(Counter, {
            props: {
                title: titleDefault
            }
        })

        let title = wrapper.find('h2').text()
        expect(title).toBe(titleDefault)
    })
})
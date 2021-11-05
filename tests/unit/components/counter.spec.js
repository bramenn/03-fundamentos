import { shallowMount } from '@vue/test-utils'
import Counter from '@/components/Counter'

//Prueba que evalua si un componente cambio
describe('Counter Component', () => {
    test('Debe hacer match con el snapshot', () => {
        let wrapper = shallowMount(Counter)
        expect(wrapper.html()).toMatchSnapshot()
    })

    test('h2 debe de tener el valor por defecto', () => {
        let wrapper = shallowMount(Counter)
        let h2Value = wrapper.find("h2").text()
        expect(h2Value).toBe("Counter")
    })
})
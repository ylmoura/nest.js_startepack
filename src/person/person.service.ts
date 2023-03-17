import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PersonData } from './interface/randomPerson';

@Injectable()
export class PersonService {
  async findAll() {
    const { data, status } = await axios.get<PersonData>(
      'https://randomuser.me/api/',
    );

    if (status !== 200) {
      return {
        status,
        message: 'Ocorreu um erro na hora de solicitar um usuário',
      };
    }

    const calcularIdade = (birthday: string | Date) =>
      new Date().getFullYear() - new Date(birthday).getFullYear();

    /**
     *            0  <- valor                                1                                    2
     * [{ name: 'Jorge', gender: 'male' }, { name: 'Maria', gender: 'female' }, { name: 'José', gender: 'male' }]
     *
     */
    // [] `names` é uma array de valores neste caso os valores são objetos
    //                              valor.name
    const mappedUser = data.results.map(
      ({ name, location, gender, email, login, nat, picture, dob }) => ({
        id: login.uuid,
        nome: name.first.toUpperCase(),
        //      Condição    Se for true  Caso for false
        sexo: gender === 'male' ? 'homem' : 'mulher',
        cep: location.postcode,
        cidade: location.city,
        nasceu: new Date(dob.date).toLocaleString('pt-br'),
        idade: calcularIdade(dob.date),
      }),
    );

    // Filter serve para você filtrar se o dado sendo testado existe
    // Caso existe, retorna TODO O VALOR
    // Caso contrário, o dado não é retornado
    const filteredData = data.results.filter(
    //      Valor                       Condição
      ({ gender, dob }) => new Date(dob.date) > new Date(1998, 1, 1, 0, 0),
    );

    // .length retorna o tamanho da array
    // [{ name: 'Jorge', gender: 'male' }, { name: 'Maria', gender: 'female' }, { name: 'José', gender: 'male' }]
    // tamanho dessa array é ^ 3
    // pegar index é `filteredData.length - 1` = 2
    // pegando o última valor da array = filteredData[2]
    const filteredSize = filteredData.length;

    // verificando se há dados na array
    const hasDataInFilteredSize = filteredSize > 0;

    return {
      user: mappedUser,
      didHeBornAfter1998: filteredData.length > 0,
      data: hasDataInFilteredSize ? null  : filteredData,
    };
  }
}

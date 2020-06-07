import { PessoaInscrita } from "./types";
import ProcessaValidacoes from "./ProcessaValidacoes";

const pessoaInscrita = {
  nome: "Fulano de Tal",
  carteiraOAB: true,
  primeiraFase: true,
  segundaFase: true,
  notaPrimeiraFase: 7,
  notaSegundaFase: 8,
  periodo: 8,
} as PessoaInscrita;

describe("Processa validações", () => {
  it("deve passar pela primeira validação", () => {
    // given
    const primeiraValidacao = jest.fn();

    const processaValidacoes = new ProcessaValidacoes(pessoaInscrita);
    // when
    processaValidacoes.setValidacoes(primeiraValidacao).process();
    // then
    expect(primeiraValidacao).toHaveBeenCalled();
  });

  it("deve passar por duas validações", () => {
    // given
    const primeiraValidacao = jest
      .fn()
      .mockImplementation((pessoa, proximaValidacao: Function) => {
        if (true) {
          proximaValidacao();
        }
      });
    const segundaValidacao = jest
      .fn()
      .mockImplementation((pessoa, proximaValidacao: Function) => {});

    const processaValidacoes = new ProcessaValidacoes(pessoaInscrita);
    // when
    processaValidacoes
      .setValidacoes(primeiraValidacao, segundaValidacao)
      .process();
    // then
    expect(primeiraValidacao).toHaveBeenCalled();
    expect(segundaValidacao).toHaveBeenCalled();
  });

  it("deve passar por tres validações", () => {
    // given
    const primeiraValidacao = jest
      .fn()
      .mockImplementation((pessoa, proximaValidacao: Function) => {
        if (true) {
          proximaValidacao();
        }
      });
    const segundaValidacao = jest
      .fn()
      .mockImplementation((pessoa, proximaValidacao: Function) => {
        if (true) {
          proximaValidacao();
        }
      });

    const terceiraValidacao = jest
      .fn()
      .mockImplementation((pessoa, proximaValidacao: Function) => {});

    const processaValidacoes = new ProcessaValidacoes(pessoaInscrita);
    // when
    processaValidacoes
      .setValidacoes(primeiraValidacao, segundaValidacao, terceiraValidacao)
      .process();
    // then
    expect(primeiraValidacao).toHaveBeenCalled();
    expect(segundaValidacao).toHaveBeenCalled();
    expect(terceiraValidacao).toHaveBeenCalled();
  });

  it("não deve passar para segunda validação se a primeira não for válida", () => {
    // given
    const primeiraValidacao = jest
      .fn()
      .mockImplementation((pessoa, proximaValidacao: Function) => {
        if (false) {
          proximaValidacao();
        }
      });

    const segundaValidacao = jest
      .fn()
      .mockImplementation((pessoa, proximaValidacao: Function) => {});

    const processaValidacoes = new ProcessaValidacoes(pessoaInscrita);
    // when
    processaValidacoes
      .setValidacoes(primeiraValidacao, segundaValidacao)
      .process();
    // then
    expect(primeiraValidacao).toHaveBeenCalled();
    expect(segundaValidacao).not.toHaveBeenCalled();
  });
});

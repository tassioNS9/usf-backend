import prisma from "../src/database";
import {TypeIndicators} from "@prisma/client"
import { Role } from "@prisma/client";
import { hash } from "bcrypt";
async function main() {
    try {

        const units = [
            {
                name : 'Unidade Geral de SAJ',
                tel:'36212589',
                address:'AV BARROS E ALMEIDA',
                neighborhood:'centro',
                city:'Santo Antonio',
                state:'Bahia',

            },
            {
                name : 'Unidade da Mulher',
                tel:'36214589',
                address:'AV Carlos Magalhaes',
                neighborhood:'centro',
                city:'Santo Antonio',
                state:'Bahia',

            },
            {
                name : 'Unidade Regional Santo Antonio',
                tel:'362124589',
                address:'AV BARROS E ALMEIDA',
                neighborhood:'centro',
                city:'Santo Antonio',
                state:'Bahia',

            },
            {
                name : 'Unidade e Maternidade Luiz Argolo',
                tel:'36214487',
                address:'AV BARROS E ALMEIDA',
                neighborhood:'centro',
                city:'Santo Antonio',
                state:'Bahia',

            }
        ]


        await prisma.unit.createMany({
            data: units,
        });

        const HashPassword = await hash('12345678', 8)
        const HashPassword2 = await hash('12345678', 8)

        const users = [
            {
                name:"Tassio Neves Santos",
                cpf:"07469410562",
                password:HashPassword,
                office:"ADM",
                role:Role.ADMIN
            },
            {
                name:"Joao Oliveira Neto",
                cpf:"72308421070",
                password:HashPassword,
                office:"Gestor",
                role:Role.MANAGER
            },
            {
                name:"Júlio Paris",
                cpf:"22188343085",
                password:HashPassword2,
                office:"Gestor",
                role:Role.MANAGER
            },
            {
                name:"Clotilde de Assis",
                cpf:"65936076903",
                password:HashPassword2,
                id_unit:1,
                office:"Diretora da Unidade",
                role:Role.DIRECTOR
            },
            {
                name:"Jessica Oliveira Santos",
                cpf:"46720251520",
                password:HashPassword2,
                id_unit:1,
                office:"Enfermeira",
                role:Role.USER
            },    
            {
                name:"Letícia De Novais",
                cpf:"76738584601",
                id_unit:1,
                password:HashPassword,
                office:"Enfermeira",
                role:Role.USER
            },
            {
                name:"Larissa Frias Paris",
                cpf:"55660565638",
                password:HashPassword2,
                id_unit:2,
                office:"Diretora da Unidade",
                role:Role.DIRECTOR
            },
            {
                name:"Muriel Gomes",
                cpf:"42878238770",
                password:HashPassword,
                id_unit:2,
                office:"Médico",
                role:Role.USER
            },
            {
                name:"Rita Tatiane da Rocha",
                cpf:"32665382695",
                password:HashPassword,
                id_unit:2,
                office:"Enfermeiro",
                role:Role.USER
            },
            {
                name:"Melinda Santana",
                cpf:"96738983247",
                password:HashPassword2,
                id_unit:3,
                office:"Diretora da Unidade",
                role:Role.DIRECTOR
            },
            {
                name:"Yasmim Marques Santana",
                cpf:"62902376596",
                password:HashPassword,
                id_unit:3,
                office:"Médico",
                role:Role.USER
            },
            {
                name:"Rafael Novaes Santana",
                cpf:"29875864935",
                password:HashPassword2,
                id_unit:3,
                office:"Enfermeira",
                role:Role.USER
            },
            {
                name:"Manuela Sampaio Santos",
                cpf:"79781649690",
                password:HashPassword2,
                id_unit:4,
                office:"Diretora da Unidade",
                role:Role.DIRECTOR
            },
            {
                name:"Tomás Gael Barros",
                cpf:"87697018144",
                password:HashPassword2,
                id_unit:4,
                office:"Médico",
                role:Role.USER
            },
            {
                name:"Fernando Theo Araújo",
                cpf:"31152108840",
                password:HashPassword2,
                id_unit:4,
                office:"Enfermeiro",
                role:Role.USER
            },

        ]

        await prisma.user.createMany({
                data: users,
             });
        

        const guidelines = [
            {
     
                numeration: 1,
                description: 'Qualificação da rede de atenção integral à saúde mental, garantindo a Integralidade do cuidado centrado nas necessidades das pessoas com transtornos mentais, incluídos os decorrentes do uso de substâncias psicoativas'

            },
            {  
                numeration: 2,
                description: 'Aperfeiçoar e ampliar a resolutividade das ações de vigilância epidemiológica, sanitária e saúde do trabalhador, reduzindo e controlando a ocorrência de doenças e agravos passíveis de prevenção e controle, promovendo o cuidado integral e resolutivo.'
            },
            {  
                numeration: 3,
                description: 'Qualificar o serviço de assistência farmacêutica no município para o fornecimento regular de medicação para a população.'
            }, 
            {
          
                numeration: 4,
                description: 'Qualificar a atenção especializada, ambulatorial, urgência e emergência, potencializando a rede de atenção à saúde, ampliando a equidade de acesso e garantindo a integralidade da assistência, em tempo adequado ao atendimento das necessidades de saúde.'
            },
            {
          
                numeration: 5,
                description: 'Implementação de equipes multiprofissionais, com definição de métodos de atuação e como referência para a usuária'
            },

        ]

        await prisma.guideline.createMany({
            data: guidelines,
        });

        const objectives = [
            {
                numeration:1,
                description:'Promover a Atenção Psicossocial de forma integrada e articulada com a rede de cuidado.',
                id_guideline:1,
            },
            {
                numeration:1,
                description:'Fortalecer o Sistema Municipal de Vigilância Epidemiológica com vistas à redução dos riscos e agravos à saúde da população, por meio das ações de prevenção de doenças e agravos, promoção da saúde e vigilância à saúde.',
                id_guideline:2,
            },
            {
                numeration:2,
                description:'Aprimorar as ações de vigilância à Saúde no Centro de Testagem e Aconselhamento (CTA) e o Serviço de	 Assistência Especializada (SAE)',
                id_guideline:2,
            },
            {
                numeration:3,
                description:'Promover ações de prevenção em saúde, minimizando a ocorrência de doenças endêmicas.',
                id_guideline:2
            },
            {
                numeration:3,
                description:'Organizar a atenção e a oferta de cuidado a partir da implementação de equipes multiprofissionais, com métodos e instrumentos de orientação do Trabalho.',
                id_guideline:5
            },
            
        ]

        await prisma.objective.createMany({
            data: objectives,
        });

        const indicators = [
            {
                description:'Nº médio de ações de matriciamento',
                id_objective:1,
                type_Indicator : TypeIndicators.NUMERIC,
                sources:'fonte 1',
            },
            {
                description:'Nº de instalações adequadas ao serviço',
                id_objective:1,
                type_Indicator : TypeIndicators.NUMERIC,
                sources:'fonte 222',
            },
            {
                description:'Número de profissionais contratados',
                id_objective:1,
                type_Indicator : TypeIndicators.NUMERIC,
                sources:'fonte 33',
            },
            {
                description:'% de alimentação do sistema',
                id_objective:2,
                type_Indicator : TypeIndicators.NUMERIC,
                sources:'fonte 1',
            },
            {
                description:'Equipes de atenção básica/saúde da família constituídas como equipes multiprofissionais, com metodologia e plano de atuação.',
                id_objective:5,
                type_Indicator : TypeIndicators.BOOL,
                sources:'Ouvidoria do SUS',
            },
            {
                description:'Existência de rede integrada de atenção às mulheres em situação de violência.',
                id_objective:5,
                type_Indicator : TypeIndicators.BOOL,
                sources:'Banco de dados do SUS',
            }
        ]

        await prisma.indicator.createMany({
            data: indicators,
        });


        const evaluations = [
            {
                id_indicator: 1,
                id_unit: 1,
                evaluator: "Jessica Oliveira Santos",
                date_evaluation: "2024-01-20T00:00:00.000Z",
                valueNum: 120,
                valueBol: null,
            },

            {
                id_indicator: 1,
                id_unit: 1,
                evaluator: "Jessica Oliveira Santos",
                date_evaluation: "2024-02-20T00:00:00.000Z",
                valueNum: 150,
                valueBol: null,
            },

            {
                id_indicator: 1,
                id_unit: 1,
                evaluator: "Jessica Oliveira Santos",
                date_evaluation: "2024-03-20T00:00:00.000Z",
                valueNum: 90,
                valueBol: null,
            },
            {
                id_indicator: 1,
                id_unit: 1,
                evaluator: "Jessica Oliveira Santos",
                date_evaluation: "2024-04-20T00:00:00.000Z",
                valueNum: 90,
                valueBol: null,
            },
            {
                id_indicator: 1,
                id_unit: 1,
                evaluator: "Jessica Oliveira Santos",
                date_evaluation: "2024-05-20T00:00:00.000Z",
                valueNum: 60,
                valueBol: null,
            },
            {
                id_indicator: 1,
                id_unit: 1,
                evaluator: "Jessica Oliveira Santos",
                date_evaluation: "2024-06-20T00:00:00.000Z",
                valueNum: 50,
                valueBol: null,
            },
            {
                id_indicator: 1,
                id_unit: 1,
                evaluator: "Jessica Oliveira Santos",
                date_evaluation: "2024-07-20T00:00:00.000Z",
                valueNum: 20,
                valueBol: null,
            },
            {
                id_indicator: 1,
                id_unit: 1,
                evaluator: "Jessica Oliveira Santos",
                date_evaluation: "2024-08-20T00:00:00.000Z",
                valueNum: 43,
                valueBol: null,
            },
            {
                id_indicator: 1,
                id_unit: 1,
                evaluator: "Jessica Oliveira Santos",
                date_evaluation: "2024-09-20T00:00:00.000Z",
                valueNum: 111,
                valueBol: null,
            },
            {
                id_indicator: 1,
                id_unit: 1,
                evaluator: "Jessica Oliveira Santos",
                date_evaluation: "2024-10-20T00:00:00.000Z",
                valueNum: 110,
                valueBol: null,
            },
            {
                id_indicator: 1,
                id_unit: 1,
                evaluator: "Jessica Oliveira Santos",
                date_evaluation: "2024-11-20T00:00:00.000Z",
                valueNum: 180,
                valueBol: null,
            },
            {
                id_indicator: 1,
                id_unit: 1,
                evaluator: "Jessica Oliveira Santos",
                date_evaluation: "2024-12-20T00:00:00.000Z",
                valueNum: 110,
                valueBol: null,
            },
            {
                id_indicator: 2,
                id_unit: 1,
                evaluator: "Jessica Oliveira Santos",
                date_evaluation: "2023-01-20T00:00:00.000Z",
                valueNum: 110,
                valueBol: null,
            },

            {
                id_indicator: 2,
                id_unit: 1,
                evaluator: "Jessica Oliveira Santos",
                date_evaluation: "2023-02-20T00:00:00.000Z",
                valueNum: 40,
                valueBol: null,
            },

            {
                id_indicator: 2,
                id_unit: 1,
                evaluator: "Jessica Oliveira Santos",
                date_evaluation: "2023-03-20T00:00:00.000Z",
                valueNum: 70,
                valueBol: null,
            },
            {
                id_indicator: 2,
                id_unit: 1,
                evaluator: "Jessica Oliveira Santos",
                date_evaluation: "2023-04-20T00:00:00.000Z",
                valueNum: 110,
                valueBol: null,
            },
            {
                id_indicator: 2,
                id_unit: 1,
                evaluator: "Jessica Oliveira Santos",
                date_evaluation: "2023-05-20T00:00:00.000Z",
                valueNum: 50,
                valueBol: null,
            },
            {
                id_indicator: 2,
                id_unit: 1,
                evaluator: "Jessica Oliveira Santos",
                date_evaluation: "2023-06-20T00:00:00.000Z",
                valueNum: 80,
                valueBol: null,
            },
            {
                id_indicator: 2,
                id_unit: 1,
                evaluator: "Jessica Oliveira Santos",
                date_evaluation: "2023-07-20T00:00:00.000Z",
                valueNum: 120,
                valueBol: null,
            },
            {
                id_indicator: 2,
                id_unit: 1,
                evaluator: "Jessica Oliveira Santos",
                date_evaluation: "2023-08-20T00:00:00.000Z",
                valueNum: 143,
                valueBol: null,
            },
            {
                id_indicator: 2,
                id_unit: 1,
                evaluator: "Jessica Oliveira Santos",
                date_evaluation: "2023-09-20T00:00:00.000Z",
                valueNum: 101,
                valueBol: null,
            },
            {
                id_indicator: 2,
                id_unit: 1,
                evaluator: "Jessica Oliveira Santos",
                date_evaluation: "2023-10-20T00:00:00.000Z",
                valueNum: 30,
                valueBol: null,
            },
            {
                id_indicator: 2,
                id_unit: 1,
                evaluator: "Jessica Oliveira Santos",
                date_evaluation: "2023-11-20T00:00:00.000Z",
                valueNum: 180,
                valueBol: null,
            },
            {
                id_indicator: 2,
                id_unit: 1,
                evaluator: "Jessica Oliveira Santos",
                date_evaluation: "2023-12-20T00:00:00.000Z",
                valueNum: 210,
                valueBol: null,
            },
            {
                id_indicator: 2,
                id_unit: 2,
                evaluator: "Larissa Frias Paris",
                date_evaluation: "2023-01-20T00:00:00.000Z",
                valueNum: 100,
                valueBol: null,
            },

            {
                id_indicator: 2,
                id_unit: 2,
                evaluator: "Larissa Frias Paris",
                date_evaluation: "2023-02-20T00:00:00.000Z",
                valueNum: 50,
                valueBol: null,
            },

            {
                id_indicator: 2,
                id_unit: 2,
                evaluator: "Larissa Frias Paris",
                date_evaluation: "2023-03-20T00:00:00.000Z",
                valueNum: 80,
                valueBol: null,
            },
            {
                id_indicator: 2,
                id_unit: 2,
                evaluator: "Larissa Frias Paris",
                date_evaluation: "2023-04-20T00:00:00.000Z",
                valueNum: 55,
                valueBol: null,
            },
            {
                id_indicator: 2,
                id_unit: 2,
                evaluator: "Larissa Frias Paris",
                date_evaluation: "2023-05-20T00:00:00.000Z",
                valueNum: 70,
                valueBol: null,
            },
            {
                id_indicator: 2,
                id_unit: 2,
                evaluator: "Larissa Frias Paris",
                date_evaluation: "2023-06-20T00:00:00.000Z",
                valueNum: 20,
                valueBol: null,
            },
            {
                id_indicator: 2,
                id_unit: 2,
                evaluator: "Larissa Frias Paris",
                date_evaluation: "2023-07-20T00:00:00.000Z",
                valueNum: 110,
                valueBol: null,
            },
            {
                id_indicator: 2,
                id_unit: 2,
                evaluator: "Larissa Frias Paris",
                date_evaluation: "2023-08-20T00:00:00.000Z",
                valueNum: 140,
                valueBol: null,
            },
            {
                id_indicator: 2,
                id_unit: 2,
                evaluator: "Larissa Frias Paris",
                date_evaluation: "2023-09-20T00:00:00.000Z",
                valueNum: 111,
                valueBol: null,
            },
            {
                id_indicator: 2,
                id_unit: 2,
                evaluator: "Larissa Frias Paris",
                date_evaluation: "2023-10-20T00:00:00.000Z",
                valueNum: 40,
                valueBol: null,
            },
            {
                id_indicator: 2,
                id_unit: 2,
                evaluator: "Larissa Frias Paris",
                date_evaluation: "2023-11-20T00:00:00.000Z",
                valueNum: 120,
                valueBol: null,
            },
            {
                id_indicator: 2,
                id_unit: 2,
                evaluator: "Larissa Frias Paris",
                date_evaluation: "2023-12-20T00:00:00.000Z",
                valueNum: 65,
                valueBol: null,
            },
        ]

          await prisma.evaluation.createMany({
            data: evaluations,
         });

        console.log("Seed completed successfully");
    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        await prisma.$disconnect();
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
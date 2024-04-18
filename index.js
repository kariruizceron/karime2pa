#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';


let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    'How well do you know me? \n'
  );

  await sleep();
  rainbowTitle.stop();

  console.log(`
    ${chalk.bgBlue('HOW TO PLAY')} 
    I am a process on your computer.
    If you get any question wrong I will be ${chalk.bgRed('killed')}
    So get all the questions right...

  `);
}

async function askName() {
    const answers = await inquirer.prompt({
      name: 'player_name',
      type: 'input',
      message: 'What is your name?',
      default() {
        return 'Player';
      },
    });
  
    playerName = answers.player_name;
  }

  async function question1() {
    const answers = await inquirer.prompt({
      name: 'question1',
      type: 'list',
      message: 'What is my favorite color?\n',
      choices: [
        'red',
        'blue',
        'pink',
        'purple',
      ],
    });
  
    return handleAnswer(answers.question_1 === 'blue');
  }

  async function question2() {
    const answers = await inquirer.prompt({
      name: 'question2',
      type: 'list',
      message: 'What is my favorite play?\n',
      choices: [
        'soccer',
        'volley',
        'basket',
        'padel',
      ],
    });
  
    return handleAnswer(answers.question_1 === 'soccer');
  }

  
  async function question3() {
    const answers = await inquirer.prompt({
      name: 'question3',
      type: 'list',
      message: 'What is my favorite food?\n',
      choices: [
        'pizza',
        'spagetthi',
        'ramen',
        'quesadillas',
      ],
    });
  
    return handleAnswer(answers.question_1 === 'spagetthi');
  }

  async function question4() {
    const answers = await inquirer.prompt({
      name: 'question4',
      type: 'list',
      message: 'What is my favorite activity?\n',
      choices: [
        'walk',
        'read',
        'run',
        'eat',
      ],
    });
  
    return handleAnswer(answers.question_1 === 'eat');
  }

  async function question5() {
    const answers = await inquirer.prompt({
      name: 'question5',
      type: 'list',
      message: 'What is my favorite animal?\n',
      choices: [
        'dog',
        'cat',
        'bee',
        'monkey',
      ],
    });
  
    return handleAnswer(answers.question_1 === 'monkey');
  }


  async function handleAnswer(isCorrect) {
    const spinner = createSpinner('Checking answer...').start();
    await sleep();
  
    if (isCorrect) {
      spinner.success({ text: `Nice work ${playerName}. That's a legit answer` });
    } else {
      spinner.error({ text: `💀💀💀 Game over, you lose ${playerName}!` });
      process.exit(1);
    }
  }

  function winner() {
    console.clear();
    figlet(`Congrats , ${playerName} !`, (err, data) => {
      console.log(gradient.pastel.multiline(data) + '\n');

      console.log(
        chalk.green(
          `I owe you your favorite thing in the world`
        )
      );
  
      process.exit(0);
    });
  }

console.clear();
await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
winner();

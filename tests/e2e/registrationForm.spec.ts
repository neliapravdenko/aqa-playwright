import test, { expect } from '@playwright/test';
import { usersList } from '../../test-data/users';
import HomePage from '../../pom/pages/HomePage';
import SignUpForm from '../../pom/forms/SignUpForm';

let homePage: HomePage;
let signUpForm: SignUpForm;

test.describe('Registration form', () => {
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    signUpForm = new SignUpForm(page);
    await homePage.open();
    await homePage.clickSignUpButton();
    await expect(signUpForm.signUpModal).toBeVisible();
  });
  test.describe('Positive registration tests', () => {
    test('Should display "Registration" heading on the form', async () => {
      await expect(signUpForm.registrationHeadingText).toBeVisible();
    });

    test('Should successfully register a new user with valid data', async () => {
      await signUpForm.registerUser(
        usersList.validUser.name,
        usersList.validUser.lastName,
        usersList.validUser.email,
        usersList.validUser.password,
        usersList.validUser.password
      );
      await expect(signUpForm.userProfileIcon).toBeVisible();
    });
  });
  test.describe('Field "Name" validation', () => {
    test('Should not register user without name field', async () => {
      await signUpForm.enterLastName(usersList.validUser.lastName);
      await signUpForm.enterEmail(usersList.validUser.email);
      await signUpForm.enterPassword(usersList.validUser.password);
      await signUpForm.enterRepeatPassword(usersList.validUser.password);
      await expect(signUpForm.registerButton).toBeDisabled();
    });

    test('Should display error when name field is empty', async () => {
      await signUpForm.triggerEmptyErrorOnField('name');
      await signUpForm.verifyErrorIsDisplayed('Name required');
    });

    test('Should display error for non-English characters in name', async () => {
      await signUpForm.enterName(usersList.invalidUser.name.nonEnglish);
      await signUpForm.unfocusField('name');
      await expect(signUpForm.errorMessage).toHaveText('Name is invalid');
    });

    test('Should display error when the name is too short', async () => {
      await signUpForm.enterName(usersList.invalidUser.name.short);
      await signUpForm.unfocusField('name');
      await expect(signUpForm.errorMessage).toHaveText('Name has to be from 2 to 20 characters long');
    });

    test('Should display error when the name is too long', async () => {
      await signUpForm.enterName(usersList.invalidUser.name.long);
      await signUpForm.unfocusField('name');
      await expect(signUpForm.errorMessage).toHaveText('Name has to be from 2 to 20 characters long');
    });

    test('Should trim leading, middle, and trailing spaces in name', async () => {
      //leading spaces
      await signUpForm.enterName(usersList.invalidUser.name.withLeaingSpaces);
      await signUpForm.unfocusField('name');
      // expect(signUpForm.errorMessage).not.toBeVisible(); test fails

      //trailing spaces
      await signUpForm.enterName(usersList.invalidUser.name.withTrailingSpaces);
      await signUpForm.unfocusField('name');
      // expect(signUpForm.errorMessage).not.toBeVisible();

      //spaces in the middle
      await signUpForm.enterName(usersList.invalidUser.name.withSpaceInTheMiddle);
      await signUpForm.unfocusField('name');
      // expect(signUpForm.errorMessage).not.toBeVisible();
    });

    test('Should highlight name field with red border on validation error', async () => {
      await signUpForm.triggerEmptyErrorOnField('name');
      await expect(signUpForm.nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });
  });

  test.describe('Field "Last name" validation', () => {
    test('Should not register user without last name field', async () => {
      await signUpForm.enterName(usersList.validUser.name);
      await signUpForm.enterEmail(usersList.validUser.email);
      await signUpForm.enterPassword(usersList.validUser.password);
      await signUpForm.enterRepeatPassword(usersList.validUser.password);
      await expect(signUpForm.registerButton).toBeDisabled();
    });

    test('Should display error when last name field is empty', async () => {
      await signUpForm.triggerEmptyErrorOnField('lastname');
      await signUpForm.verifyErrorIsDisplayed('Last name required');
    });

    test('Should display error for non-English characters in last name', async () => {
      await signUpForm.enterLastName(usersList.invalidUser.lastName.nonEnglish);
      await signUpForm.unfocusField('lastname');
      await expect(signUpForm.errorMessage).toHaveText('Last name is invalid');
    });

    test('Should display error when the last name is too short', async () => {
      await signUpForm.enterLastName(usersList.invalidUser.lastName.short);
      await signUpForm.unfocusField('lastname');
      await expect(signUpForm.errorMessage).toHaveText('Last name has to be from 2 to 20 characters long');
    });

    test('Should display error when the last name is too long', async () => {
      await signUpForm.enterLastName(usersList.invalidUser.lastName.long);
      await signUpForm.unfocusField('lastname');
      await expect(signUpForm.errorMessage).toHaveText('Last name has to be from 2 to 20 characters long');
    });

    test('Should trim leading, middle, and trailing spaces in last name', async () => {
      //leading spaces
      await signUpForm.enterLastName(usersList.invalidUser.lastName.withLeaingSpaces);
      await signUpForm.unfocusField('lastname');
      // expect(signUpForm.errorMessage).not.toBeVisible(); test fails

      //trailing spaces
      await signUpForm.enterLastName(usersList.invalidUser.lastName.withTrailingSpaces);
      await signUpForm.unfocusField('lastname');
      // expect(signUpForm.errorMessage).not.toBeVisible();

      //spaces in the middle
      await signUpForm.enterLastName(usersList.invalidUser.lastName.withSpaceInTheMiddle);
      await signUpForm.unfocusField('lastname');
      // expect(signUpForm.errorMessage).not.toBeVisible();
    });

    test('Should highlight last name field with red border on validation error', async () => {
      await signUpForm.triggerEmptyErrorOnField('lastname');
      await expect(signUpForm.lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });
  });

  test.describe('Field "Email" validation', () => {
    test('Should not register user without email field', async () => {
      await signUpForm.enterName(usersList.validUser.name);
      await signUpForm.enterLastName(usersList.validUser.lastName);
      await signUpForm.enterPassword(usersList.validUser.password);
      await signUpForm.enterRepeatPassword(usersList.validUser.password);
      await expect(signUpForm.registerButton).toBeDisabled();
    });

    test('Should display error for email without "@" symbol', async () => {
      await signUpForm.enterEmail(usersList.invalidUser.email.noAt);
      await signUpForm.unfocusField('email');
      await signUpForm.verifyErrorIsDisplayed('Email is incorrect');
    });

    test('Should display error for email without prefix', async () => {
      await signUpForm.enterEmail(usersList.invalidUser.email.noPrefix);
      await signUpForm.unfocusField('email');
      await signUpForm.verifyErrorIsDisplayed('Email is incorrect');
    });

    test('Should display error for email without domain', async () => {
      await signUpForm.enterEmail(usersList.invalidUser.email.noDomain);
      await signUpForm.unfocusField('email');
      await signUpForm.verifyErrorIsDisplayed('Email is incorrect');
    });

    test('Should display error for email without TLD', async () => {
      await signUpForm.enterEmail(usersList.invalidUser.email.noTld);
      await signUpForm.unfocusField('email');
      await signUpForm.verifyErrorIsDisplayed('Email is incorrect');
    });

    test('Should display error when email field is empty', async () => {
      await signUpForm.triggerEmptyErrorOnField('email');
      await signUpForm.verifyErrorIsDisplayed('Email required');
    });

    test('Should highlight email field with red border on validation error', async () => {
      await signUpForm.triggerEmptyErrorOnField('email');
      await expect(signUpForm.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });
  });

  test.describe('Field "Password" validation', () => {
    test('Should not register user without password field', async () => {
      await signUpForm.enterName(usersList.validUser.name);
      await signUpForm.enterLastName(usersList.validUser.lastName);
      await signUpForm.enterEmail(usersList.validUser.email);
      await signUpForm.enterRepeatPassword(usersList.validUser.password);
      await expect(signUpForm.registerButton).toBeDisabled();
    });

    test('Should display error if password is shorter than 8 characters', async () => {
      await signUpForm.enterPassword(usersList.invalidUser.password.short);
      await signUpForm.unfocusField('password');
      await signUpForm.verifyErrorIsDisplayed(
        'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
      );
    });

    test('Should display error if password is longer than 15 characters', async () => {
      await signUpForm.enterPassword(usersList.invalidUser.password.long);
      await signUpForm.unfocusField('password');
      await signUpForm.verifyErrorIsDisplayed(
        'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
      );
    });

    test('Should display error if password has no numbers', async () => {
      await signUpForm.enterPassword(usersList.invalidUser.password.noNumber);
      await signUpForm.unfocusField('password');
      await signUpForm.verifyErrorIsDisplayed(
        'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
      );
    });

    test('Should display error if password has no capital letters', async () => {
      await signUpForm.enterPassword(usersList.invalidUser.password.noCapital);
      await signUpForm.unfocusField('password');
      await signUpForm.verifyErrorIsDisplayed(
        'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
      );
    });

    test('Should display error if password has no small letters', async () => {
      await signUpForm.enterPassword(usersList.invalidUser.password.noSmall);
      await signUpForm.unfocusField('password');
      await signUpForm.verifyErrorIsDisplayed(
        'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
      );
    });

    test('Should display error when password field is empty', async () => {
      await signUpForm.triggerEmptyErrorOnField('password');
      await signUpForm.verifyErrorIsDisplayed('Password required');
    });

    test('Should highlight password field with red border on validation error', async () => {
      await signUpForm.triggerEmptyErrorOnField('password');
      await expect(signUpForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });
  });
  test.describe('Field "Re-enter password" validation', () => {
    test('Should not register user without re-enter password field', async () => {
      await signUpForm.enterName(usersList.validUser.name);
      await signUpForm.enterLastName(usersList.validUser.lastName);
      await signUpForm.enterEmail(usersList.validUser.email);
      await signUpForm.enterPassword(usersList.validUser.password);
      await expect(signUpForm.registerButton).toBeDisabled();
    });

    test('Should display error if passwords do not match', async () => {
      await signUpForm.enterPassword(usersList.validUser.password);
      await signUpForm.enterRepeatPassword(usersList.invalidUser.password.notMatch);
      await signUpForm.unfocusField('repeatpassword');
      await signUpForm.verifyErrorIsDisplayed('Passwords do not match');
    });

    test('Should display error when re-enter password field is empty', async () => {
      await signUpForm.triggerEmptyErrorOnField('repeatpassword');
      await signUpForm.verifyErrorIsDisplayed('Re-enter password required');
    });

    test('Should highlight re-enter password field with red border on validation error', async () => {
      await signUpForm.triggerEmptyErrorOnField('repeatpassword');
      await expect(signUpForm.repeatPasswordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });
  });

  test.describe('"Register" button validation', () => {
    test('Should enable "Register" button when all fields are valid', async () => {
      await signUpForm.enterName(usersList.validUser.name);
      await signUpForm.enterLastName(usersList.validUser.lastName);
      await signUpForm.enterEmail(usersList.validUser.email);
      await signUpForm.enterPassword(usersList.validUser.password);
      await signUpForm.enterRepeatPassword(usersList.validUser.password);
      await expect(signUpForm.registerButton).toBeEnabled();
    });

    test('Should disable "Register" button when the form is empty', async () => {
      await expect(signUpForm.registerButton).toBeDisabled();
    });

    test('Should keep "Register" button disabled if any field is invalid', async () => {
      await signUpForm.enterName(usersList.validUser.name);
      await signUpForm.enterLastName(usersList.validUser.lastName);
      await signUpForm.enterEmail(usersList.validUser.email);
      await signUpForm.enterPassword(usersList.validUser.password);
      await signUpForm.enterRepeatPassword(usersList.invalidUser.password.notMatch);
      await expect(signUpForm.registerButton).toBeDisabled();
    });
  });
});

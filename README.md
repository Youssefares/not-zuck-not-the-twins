## Social Network in Rails `--api` / ReactJS / Graphql
[![Build Status](https://travis-ci.org/Youssefares/not-zuck-not-the-twins.svg?branch=master)](https://travis-ci.org/Youssefares/not-zuck-not-the-twins) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/2ba319e861534e76a6b8fed43d78a671)](https://www.codacy.com/app/Youssefares/not-zuck-not-the-twins?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Youssefares/not-zuck-not-the-twins&amp;utm_campaign=Badge_Grade)

We beat everybody to it!

### Tinker as follows:
1. Install mysql.

2. Inside `api` directory, run ```bundle```

3. Create a new mysql database user with info that are found in database.yml (root, password).

4. Inside `api` directory, run these commands:

   - ```rails db:create```

   - ```rails db:schema:load```

5. Inside `view-app` directory, run`yarn`.

### Running:
At the root of the repository, run:
   - `yarn  api`
   - `yarn view`

### Before commiting
 1. Run ```rspec``` inside the api directory as we add tests.
 2. Run ```rubocop``` to ensure no stylistic issues. (The travis pipeline will fail if rubocop fails!)


### Styling localy
If you're using Sublime text (which I recommend), make sure to have the `SublimeLinter` and `Rubocop` packages installed if you want to fix style issues as you're writing code.

A better solution (and my personal favorite) is to add a git hook. Navigate to .git/hook in the root of our repository. 

Rename `pre-commit.sample` to `pre-commit` and replace the content of the file with the following lines:

```
#!/bin/bash
echo Running Rubocop on commit diff..
cd api
rubocop 
if [ $? -eq 0 ]
then
    echo -e "\e[32mStyle checks passed successfully\e[39m"
    exit 0
else
    echo -e "\e[31mStyle checks failed: please fix style violations before committing\e[39m"
    exit 1
fi

```

This will not allow you to commit locally if your commit contains style violations and will list those violations for you. 

You will still have the option to deliberately skip the hook at times with the flag: `git commit --no-verify`

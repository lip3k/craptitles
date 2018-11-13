
<h1 align="center">
  <a href="https://imgflip.com/i/2mfgn2"><img src="https://i.imgflip.com/2mfgn2.jpg" title="made at imgflip.com"/></a>
  <br>
  <br>
  Craptitles - fix crappy subtitles
  <br>
  <br>
</h1>

Little script for replacing characters in text files.
Created to fix subtitle files in directory. By fix I mean find all the special characters that my TV won't display properly and replace them with provided substitutions.

Character pairs (bad - good characters) are to be set in the config.txt file like this:

```
ąśź // Bad characters

asz // Good characters
```

First character on the first line will be replaced with first character on the second line ('ą' => 'a'), second character on first line with second character on second line and so on.

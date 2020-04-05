Format of dictionary:

	"name of person": [friend value, foe value, love value]
			  [0 - 10      , 0 - 10   , 0 - 10    ]

	friend value:
		will only change when foe value is below 2

		increases when:
			chat
			compliment
		decreases when:
			insult

	foe value:
		will only change when friend value is below 2

		increases when:
			insult
		decreases when:
			chat
			apologize
			compliment

	love value:
		will only change when friend value is above 8

		increases when:
			flirt
			compliment
		decreases when:
			insult

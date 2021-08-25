const { Schema, model } = require('mongoose')
const reactSchema = require('./Reaction')
const dateFormat = require('../utils/dateFormat')


const thtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: 'error',
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    reactions: [reactSchema]
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
)
thtSchema.virtual('reactionCount').get(() => {
  if (!this.reactions) {
    return 0
  }
  return this.reactions.length
})

const Thought = model('Thought', thtSchema)

module.exports = Thought;
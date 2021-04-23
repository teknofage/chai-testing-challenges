require('dotenv').config()
const app = require('../server.js')
const mongoose = require('mongoose')
const chai = require('chai')
const chaiHttp = require('chai-http')
const assert = chai.assert

const User = require('../models/user.js')
const Message = require('../models/message.js')

chai.config.includeStack = true

const expect = chai.expect
const should = chai.should()
chai.use(chaiHttp)

/**
 * root level hooks
 */
after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {}
  mongoose.modelSchemas = {}
  mongoose.connection.close()
  done()
})

const SAMPLE_OBJECT_ID = "aaaaaaaaaaaa"

describe('Message API endpoints', () => {
    beforeEach((done) => {
        // TODO: add any beforeEach code here
        const sampleUser = new User({
            username: "username",
            password: "password",
        })
        sampleUser.save()
        const sampleMessage = new Message({
            title: "title",
            body: "body",
            author: sampleUser._id
        })
        sampleMessage.save()
        .then(() => {
            done()
        })
        
    })

    afterEach((done) => {
        // TODO: add any afterEach code here
        Message.deleteOne({ title: 'mytitle' })
        User.deleteOne({username : 'newuser'})
        .then(() => {
            done()
        })
    })

    it('should load all messages', (done) => {
        // TODO: Complete this
        chai.request(app)
        .get('/')
        .end((err, res) => {
            if(err) { done(err) }
            expect(res).to.have.status(200)
            expect(res.body.messages).to.be.an("array")
            done()
        })
    })

    it('should get one specific message', (done) => {
        // TODO: Complete this
        chai.request(app)
        .get('/messages/${SAMPLE_OBJECT_ID')
        done()
    })

    it('should post a new message', (done) => {
        // TODO: Complete this
        done()
    })

    it('should update a message', (done) => {
        // TODO: Complete this
        done()
    })

    it('should delete a message', (done) => {
        // TODO: Complete this
        done()
    })
})

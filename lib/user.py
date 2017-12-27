from six import text_type

class CBMUser(object):


	@property 
	def is_active(self):
		return True

	@property 
	def is_authenticated(self):
		return True

	@property 
	def is_anonymous(self):
		return False

	def get_id(self):
		return text_type(self.id)

	def get_user(self, id, dbo):
		data = dbo.get_user_by_id(id)
		self.id = data[0]
		self.username = data[1]
		self.email = data[2]

	def get_user_by_uname(self, uname, dbo):
		data = dbo.get_user_by_uname(uname)
		self.id = data[0]
		self.username = data[1]
		self.email = data[2]

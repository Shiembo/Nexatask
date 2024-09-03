# forms.py
from django import forms
from django.contrib.auth.models import User
from .models import Member

class MemberCreationForm(forms.ModelForm):
    username = forms.CharField(required=True)
    password = forms.CharField(widget=forms.PasswordInput, required=True)

    class Meta:
        model = Member
        fields = ('name',)

    def save(self, commit=True):
        user = User.objects.create_user(
            self.cleaned_data['username'],
            password=self.cleaned_data['password']
        )
        member = super(MemberCreationForm, self).save(commit=False)
        member.user = user
        if commit:
            member.save()
        return member

# Generated by Django 2.2 on 2021-03-29 22:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('VBIMusicApp', '0002_auto_20210329_2228'),
    ]

    operations = [
        migrations.AlterField(
            model_name='playlist',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]

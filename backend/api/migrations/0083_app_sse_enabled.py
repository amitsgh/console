# Generated by Django 4.2.15 on 2024-10-08 07:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0082_role_color'),
    ]

    operations = [
        migrations.AddField(
            model_name='app',
            name='sse_enabled',
            field=models.BooleanField(default=False),
        ),
    ]

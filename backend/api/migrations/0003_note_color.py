# Generated by Django 4.2 on 2023-12-06 15:14

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0002_note_title"),
    ]

    operations = [
        migrations.AddField(
            model_name="note",
            name="color",
            field=models.TextField(blank=True, null=True),
        ),
    ]

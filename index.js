require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

client.once('ready', () => {
  console.log(`✅ Bot conectado como ${client.user.tag}`);
});

// ENDPOINT DE VERIFICAÇÃO
app.get('/verificar', async (req, res) => {
  const { userId } = req.query;

  const guildId = '1208429119747137606';
  const cargoId = '1360994008134058164';

  try {
    const guild = await client.guilds.fetch(guildId);
    const member = await guild.members.fetch(userId);

    if (member.roles.cache.has(cargoId)) {
      console.log(`🟢 ${member.user.username} TEM o cargo!`);
      res.json({ autorizado: true });
    } else {
      console.log(`🔴 ${member.user.username} NÃO TEM o cargo!`);
      res.json({ autorizado: false });
    }

  } catch (err) {
    console.error('Erro ao verificar:', err);
    res.status(500).json({ erro: 'Erro ao verificar' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🌐 Servidor rodando na porta ${PORT}`);
});

client.login(process.env.DISCORD_TOKEN);

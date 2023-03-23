import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import PeopleIcon from '@mui/icons-material/People';
import ContactsIcon from '@mui/icons-material/Contacts';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ArticleIcon from '@mui/icons-material/Article';
import SummarizeIcon from '@mui/icons-material/Summarize';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import AssessmentIcon from '@mui/icons-material/Assessment';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import EngineeringIcon from '@mui/icons-material/Engineering';

import BadgeIcon from '@mui/icons-material/Badge';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';

const iconColor = {color: '#547b0f'}

const subUsuarios = [
  {label: 'Listado', icon: <BadgeIcon style={iconColor} />, route: '/users'},
  {label: 'Vacaciones', icon: <HolidayVillageIcon style={iconColor} />, route: '/vacations'},
  {label: 'Perfiles', icon: <ManageAccountsIcon style={iconColor} />, route: '/profiles'},
];

['Listado', 'Vacaciones', 'Perfiles', 'Zonas', 'Puestos', 'Alertas']

const ModulesObjectArray = [
  {label: 'Inicio', icon: <HomeIcon style={iconColor} />},
  {label: 'E-mail', icon: <EmailIcon style={iconColor} />},
  {label: 'Usuarios', icon: <PeopleIcon style={iconColor} />, subitems: subUsuarios},
  {label: 'Clientes', icon: <ContactsIcon style={iconColor} />},
  {label: 'Demostraciones', icon: <ViewModuleIcon style={iconColor} />},
  {label: 'Informes semanales', icon: <ArticleIcon style={iconColor} />},
  {label: 'Informes directivos', icon: <SummarizeIcon style={iconColor} />},
  {label: 'Gastos', icon: <PointOfSaleIcon style={iconColor} />},
  {label: 'Reportes', icon: <AssessmentIcon style={iconColor} />},
  {label: 'Prospectos', icon: <BusinessCenterIcon style={iconColor} />},
  {label: 'Operación', icon: <EngineeringIcon style={iconColor} />},
];



module.exports = { ModulesObjectArray };